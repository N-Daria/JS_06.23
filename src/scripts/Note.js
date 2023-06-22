export default class Note {
  constructor(config) {
    this.title = config.data.title;
    this.text = config.data.text;
    this.date = new Date();
    this.handleDeleteClick = config.handleDeleteClick;
    this.handleUpdateClick = config.handleUpdateClick;
    this.id = config.id;
    this.handleCancelChangingClick = config.handleCancelChangingClick;
    this.handleSubmitChangingClick = config.handleSubmitChangingClick;

    this.formatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    this.noteTemplate = document.querySelector('#note');
    this.changingTemplate = document.querySelector('#changing');
  }

  generateTemplate() {
    const note = this.noteTemplate.content.querySelector('.note__item').cloneNode(true);

    return note;
  }

  formatDate(date) {
    const formattedDate = this.formatter.format(date);
    return formattedDate.split(', ').reverse().join(' ');
  }

  getNote() {
    this.note = this.generateTemplate();

    this.titleElement = this.note.querySelector('.note__header');
    this.textElement = this.note.querySelector('.note__text');
    this.dateElement = this.note.querySelector('.note__date');
    this.deleteButton = this.note.querySelector('.note__button_delete');
    this.updateButton = this.note.querySelector('.note__button_update');
    this.note.setAttribute('id', this.id);

    this.titleElement.textContent = this.title;
    this.textElement.textContent = this.text;
    this.dateElement.textContent = this.formatDate(this.date);

    this.setEventListeners();

    return this.note;
  }

  setEventListeners() {
    this.deleteButton.addEventListener('click', () => this.handleDeleteClick());
    this.updateButton.addEventListener('click', () => this.handleUpdateClick());
  }

  generateChangingTemplate() {
    const note = this.changingTemplate.content.querySelector('.note__item').cloneNode(true);

    return note;
  }

  getChangingNote() {
    this.changingNote = this.generateChangingTemplate();

    this.dateChangingElement = this.changingNote.querySelector('.note__date');
    this.titleChangingElement = this.changingNote.querySelector('.changing__header');
    this.textChangingElement = this.changingNote.querySelector('.changing__text');
    this.cancelChanginglButton = this.changingNote.querySelector('.changing__cancel');
    this.updateChangingButton = this.changingNote.querySelector('.changing__submit');

    this.changingNote.setAttribute('id', this.id);

    this.titleChangingElement.value = this.title;
    this.textChangingElement.value = this.text;

    this.dateChangingElement.textContent = this.formatDate(this.date);

    this.changingSetEventListeners();

    return this.changingNote;
  }

  changingSetEventListeners() {
    this.cancelChanginglButton.addEventListener('click', () => this.handleCancelChangingClick());
    this.updateChangingButton.addEventListener('click', this.handleSubmitChangingClick);
  }
}
