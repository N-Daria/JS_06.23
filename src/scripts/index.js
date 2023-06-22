import '../index.html';
import '../styles/index.scss';
import { form, validationSettings, submitButton, inputList, container } from '../consts/consts';
import FormValidator from './FormValidator';
import Note from './Note';
import Popup from './Popup';

const formValidation = new FormValidator(validationSettings, form);

let noteListArray = Object.entries({ ...localStorage });
let currentNote = null;
let changingNote = null;

const popup = new Popup(handleConfirmDelete);
popup.setEventListeners();

function handleUpdateClick() {
  currentNote = this.note;
  changingNote = this.getChangingNote();

  currentNote.replaceWith(changingNote);
}

function handleSubmitChangingClick() {
  console.log(this);
}

function handleCancelChangingClick() {
  changingNote.replaceWith(currentNote);
}

function findNote(note) {
  return noteListArray.find((el) => el[1].includes('title') && note.id === el[0]);
}

function handleConfirmDelete() {
  const note = findNote(currentNote);

  localStorage.removeItem(note[0]);
  noteListArray = Object.entries({ ...localStorage });
  currentNote.note.remove();
  popup.close();
  currentNote = null;
}

function handleDeleteClick() {
  popup.open();
  currentNote = this;
}

function createNote(data, id) {
  const newNote = new Note({
    data,
    handleUpdateClick,
    handleDeleteClick,
    id,
    handleCancelChangingClick,
    handleSubmitChangingClick,
  });

  return newNote.getNote();
}

function serialize() {
  const formData = {};

  inputList.forEach((element) => {
    formData[element.name] = element.value;
  });

  return formData;
}

function render(item) {
  container.prepend(item);
}

function handleSubmit(e) {
  e.preventDefault();

  const id = JSON.stringify(new Date());

  try {
    localStorage.setItem(id, JSON.stringify(serialize()));
    noteListArray = Object.entries({ ...localStorage });
  } catch (err) {
    console.log(err);
  }

  if (localStorage.getItem(id)) {
    const note = createNote(serialize(), id);
    render(note);

    inputList.forEach((element) => {
      element.value = '';
    });
  }
}

function getStorage() {
  noteListArray.forEach((note) => {
    if (note[1].includes('title')) {
      const noteCard = createNote(JSON.parse(note[1]), note[0]);
      render(noteCard);
    }
  });
}

getStorage();

submitButton.addEventListener('click', () => {
  formValidation.removeInputListener.call(formValidation);
  formValidation.showInvalidInput.call(formValidation);
  formValidation.setInputListener.call(formValidation);
});

form.addEventListener('submit', handleSubmit);
