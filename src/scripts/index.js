import '../index.html';
import '../styles/index.scss';
import { form, validationSettings, submitButton, inputList, container } from '../consts/consts';
import FormValidator from './FormValidator';
import Note from './Note';

const formValidation = new FormValidator(validationSettings, form);

function createNote(data) {
  const newNote = new Note(data);

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
    const note = createNote(serialize());
    render(note);
  }
}

submitButton.addEventListener('click', () => {
  formValidation.removeInputListener.call(formValidation);
  formValidation.showInvalidInput.call(formValidation);
  formValidation.setInputListener.call(formValidation);
});

form.addEventListener('submit', handleSubmit);
