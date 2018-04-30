class Note {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    this.id = id;
  }

  duplicate() {
    return new Note(this.title, this.content, this.id);
  }
}

export default Note;
