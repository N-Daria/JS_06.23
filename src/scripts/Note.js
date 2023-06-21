export default class Note {
  constructor(config) {
    this.title = config.title;
    this.text = config.text;
    this.date = new Date();
    this.update = new Date();

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
    this.elementTitle = this.note.querySelector('.note__header');
    this.elementText = this.note.querySelector('.note__text');
    this.elementDate = this.note.querySelector('.note__date');
    this.elementUpdate = this.note.querySelector('.note__update');

    this.elementTitle.textContent = this.title;
    this.elementText.textContent = this.text;

    this.elementDate.textContent = `Дата создания заметки: ${this.formatDate(this.date)}`;
    this.elementUpdate.textContent = `Последнее изменение: ${this.formatDate(this.update)}`;

    this.setEventListeners();

    return this.note;
  }

  setEventListeners() {
    // add listeners
    console.log(this);
  }
}
