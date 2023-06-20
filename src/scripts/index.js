import '../index.html';
import '../styles/index.scss';
import { form, validationSettings, submitButton } from '../consts/consts';
import FormValidator from './validation';

const formValidation = new FormValidator(validationSettings, form);

function handleSubmit(e) {
  e.preventDefault();
  console.log(55);

  // localStorage.setItem();
}

submitButton.addEventListener('click', () => {
  formValidation.removeInputListener.call(formValidation);
  formValidation.showInvalidInput.call(formValidation);
  formValidation.setInputListener.call(formValidation);
});

form.addEventListener('submit', handleSubmit);
