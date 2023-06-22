export const form = document.querySelector('.adding');
export const submitButton = form.querySelector('.adding__button_submit');
export const inputList = Array.from(form.querySelectorAll('.forValidation'));
export const container = document.querySelector('.notes');

export const validationSettings = {
  formSelector: '.note__form',
  inputSelector: '.forValidation',
  inputErrorClass: 'note__input_error',
};
