import Note from '../markdown_notes/note';

class InMemoryNoteRepository {
  constructor(withSampleData = false) {
    this.lastId = 0;
    this.notes = [];
    if (withSampleData) this.addSampleData()
  }

  addSampleData() {
    this.createSync(new Note("Note 1", "Content 1"));
    this.createSync(new Note("Note 2", "Content 2"));
    this.createSync(new Note("Note 3", "Content 3"));
    this.createSync(new Note("Note 4", "Content 4"));
    this.createSync(new Note("Note 5", "Content 5"));
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
