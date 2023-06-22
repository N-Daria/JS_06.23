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

function handleCancelChangingClick() {
  changingNote.replaceWith(currentNote);
}

function handleUpdateClick() {
  if (changingNote) {
    handleCancelChangingClick();
  }

  currentNote = this.note;
  changingNote = this.getChangingNote();

  currentNote.replaceWith(changingNote);

  const updateFormValidation = new FormValidator(validationSettings, changingNote);

  changingNote.querySelector('.changing__submit').addEventListener('click', () => {
    updateFormValidation.removeInputListener.call(updateFormValidation);
    updateFormValidation.showInvalidInput.call(updateFormValidation);
    updateFormValidation.setInputListener.call(updateFormValidation);
  });
}

function handleSubmitChangingClick(event) {
  event.preventDefault();

  const updateFormInputList = Array.from(changingNote.querySelectorAll('.forValidation'));
  const inputsData = serialize(updateFormInputList);
  inputsData.updatedTime = new Date().toString();

  if (localStorage.getItem(changingNote.id)) {
    try {
      localStorage.removeItem(changingNote.id);
      localStorage.setItem(changingNote.id, JSON.stringify(inputsData));
      noteListArray = Object.entries({ ...localStorage });
    } catch (err) {
      console.log(err);

      return;
    }

    const note = createNote(inputsData, changingNote.id);

    changingNote.replaceWith(note);
  }
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

function serialize(list) {
  const formData = {};

  list.forEach((element) => {
    formData[element.name] = element.value;
  });

  return formData;
}

function render(item) {
  container.prepend(item);
}

function handleSubmit(e) {
  e.preventDefault();

  const id = new Date().toString();

  const inputsData = serialize(inputList);

  try {
    localStorage.setItem(id, JSON.stringify(inputsData));
    noteListArray = Object.entries({ ...localStorage });
  } catch (err) {
    console.log(err);

    return;
  }

  if (localStorage.getItem(id)) {
    const note = createNote(inputsData, id);
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
