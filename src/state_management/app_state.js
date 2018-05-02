import Note from '../markdown_notes/note';

class AppState {
  constructor(context) {
    this.context = context
    this.context.state = { notes: [], note: new Note("Note Title", "Note Content") };
  }

  setState(state) {
    this.context.setState(state);
  }

  setNotes(notes) {
    this.setState({ notes });
  }

  setNoteAttribute(key, value) {
    const note = this.context.state.note.duplicate();
    note[key] = value;
    this.setState({ note });
  }

  AddNewNote() {
    this.setNote(new Note());
    this.setEditing(true);
  }

  setNote(note) {
    this.setState({ note });
  }

  setEditing(editing) {
    this.setState({ editing: editing });
  }
}

export default AppState;
