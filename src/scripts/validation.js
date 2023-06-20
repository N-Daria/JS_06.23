export default class FormValidator {
  constructor(settings, form) {
    this.form = form;
    this.inputList = Array.from(this.form.querySelectorAll(settings.inputSelector));
    this.settings = settings;
  }

  classRemoveFunction(event) {
    this.hideInputError(event.target);
  }

  setInputListener() {
    this.inputList.forEach((formInput) => {
      formInput.addEventListener('input', this.classRemoveFunction.bind(this));
    });
  }

  removeInputListener() {
    this.inputList.forEach((formInput) => {
      formInput.removeEventListener('input', this.classRemoveFunction.bind(this));
    });
  }

  showInvalidInput() {
    this.inputList.forEach((formInput) => {
      this.isValid(formInput);
    });
  }

  isValid(formInput) {
    if (formInput.validity.valid) {
      this.hideInputError(formInput);
    } else {
      this.showInputError(formInput);
    }
  }

  showInputError(formInput) {
    formInput.classList.add(this.settings.inputErrorClass);
  }

  hideInputError(formInput) {
    formInput.classList.remove(this.settings.inputErrorClass);
  }
}
