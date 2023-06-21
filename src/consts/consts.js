export const form = document.querySelector('.note__form');
export const submitButton = document.querySelector('.note__button_submit');
export const inputList = Array.from(form.querySelectorAll('.forValidation'));
export const container = document.querySelector('.note__list');

export const validationSettings = {
  formSelector: '.note__form',
  inputSelector: '.forValidation',
  inputErrorClass: 'note__input_error',
};
