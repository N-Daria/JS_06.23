import '../index.html';
import '../styles/index.scss';
import { form, validationSettings, submitButton, inputList, container } from '../consts/consts';
import FormValidator from './FormValidator';
import Note from './Note';
import Popup from './Popup';

const formValidation = new FormValidator(validationSettings, form);

const noteListArray = Object.entries({ ...localStorage });
let currentNote = null;

const popup = new Popup(handleConfirmDelete);
popup.setEventListeners();

function handleUpdateClick() {
  console.log('update button');

  console.log(this);
}

function handleConfirmDelete() {
  noteListArray.forEach((el) => {
    if (JSON.parse(el[1]).title === currentNote.title) {
      console.log('compare & delete');
    }
  });
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

  const id = new Date();

  try {
    localStorage.setItem(id, JSON.stringify(serialize()));
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
    if (new Date(note[0]) !== 'Invalid Date' && typeof note[0] !== 'number') {
      const noteCard = createNote(JSON.parse(note[1]));
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
