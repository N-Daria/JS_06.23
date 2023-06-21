export default class Popup {
  constructor(handleConfirmDelete) {
    this.popup = document.querySelector('.popup');
    this.closeButton = this.popup.querySelector('.popup__close');
    this.confirm = this.popup.querySelector('.popup__confirm');
    this.cancel = this.popup.querySelector('.popup__cancel');
    this.handleConfirmDelete = handleConfirmDelete;
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.handleEscClose);
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', this.close);

    this.popup.addEventListener('click', (event) => {
      if (event.currentTarget === event.target) {
        this.close();
      }
    });

    this.confirm.addEventListener('click', this.handleConfirmDelete);
    this.cancel.addEventListener('click', this.close);
  }
}
