export class NotePresenterSpy {
  constructor(done) {
    this.done = done;
    this.presentNoteArgs = {};
    this.presentErrorArgs = {};
    this.presentValidationArgs = {};
    this.presentNoteListArgs = {};
  }

  presentNote(note) {
    this.presentNoteArgs.note = note;
    if (this.done) this.done();
  }

  presentError(error) {
    this.presentErrorArgs.error = error;
    if (this.done) this.done();
  }

  presentValidation(errors) {
    this.presentValidationArgs.errors = errors;
    if (this.done) this.done();
  }

  presentNoteList(notes) {
    this.presentNoteListArgs.notes = notes;
    if (this.done) this.done();
  }
}
