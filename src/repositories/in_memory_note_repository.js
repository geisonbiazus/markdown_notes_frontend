class InMemoryNoteRepository {
  constructor() {
    this.lastId = 0;
    this.notes = [];
  }

  create(note) {
    return new Promise((resolve) => {
      const id = ++this.lastId;
      const createdNote = Object.assign({id: id}, note);
      this.notes.push(createdNote);
      resolve(createdNote);
    });
  }

  findAll() {
    return new Promise((resolve) => {
      resolve(this.notes);
    });
  }
}

export default InMemoryNoteRepository;
