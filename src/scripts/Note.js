export default class Note {
  constructor(config) {
    this.title = config.data.title;
    this.text = config.data.text;
    this.date = new Date();
    this.handleDeleteClick = config.handleDeleteClick;
    this.handleUpdateClick = config.handleUpdateClick;
    this.id = config.id;

    this.formatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    this.noteTemplate = document.querySelector('#note');
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
    this.deleteButton = this.note.querySelector('.note__delete');
    this.updateButton = this.note.querySelector('.note__update');

    this.titleElement.textContent = this.title;
    this.textElement.textContent = this.text;
    this.dateElement.textContent = this.formatDate(this.date);

    this.setEventListeners();

    return this.note;
  }

  setEventListeners() {
    this.deleteButton.addEventListener('click', () => this.handleDeleteClick(this.note));
    this.updateButton.addEventListener('click', this.handleUpdateClick);
  }
}
