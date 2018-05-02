import Note from '../markdown_notes/note';

class AppState {
  constructor(context) {
    this.context = context
    this.context.state = { notes: [], note: new Note("Note Title", "Note Content") };
  }

  setNotes(notes) {
    this.context.setState({ notes });
  }

  setNoteAttribute(key, value) {
    const note = this.context.state.note.duplicate();
    note[key] = value;
    this.context.setState({ note });
  }
}

export default AppState;
