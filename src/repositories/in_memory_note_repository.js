import Note from '../markdown_notes/note';

class InMemoryNoteRepository {
  constructor() {
    this.lastId = 0;
    this.notes = [];
  }

  create(note) {
    return new Promise((resolve) => {
      resolve(this.createSync(note));
    });
  }

  createSync(note) {
    const id = ++this.lastId;
    const createdNote = new Note(note.title, note.content, id);
    this.notes.push(createdNote);
    return createdNote;
  }

  findAll() {
    return new Promise((resolve) => {
      resolve(this.notes);
    });
  }

  clearNotes() {
    this.notes = [];
  }
}

export default InMemoryNoteRepository;
