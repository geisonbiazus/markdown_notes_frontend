import Note from '../markdown_notes/note';

class AppState {
  constructor(context) {
    this.context = context
    this.context.state = { notes: [], note: new Note(), editing: false };
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

  addNewNote() {
    this.setNote(new Note());
    this.setEditing(true);
  }

  setNote(note) {
    this.setState({ note });
  }

  setEditing(editing) {
    this.setState({ editing: editing });
  }

  getNotes() {
    return this.context.state.notes;
  }

  getNote() {
    return this.context.state.note;
  }

  isEditing() {
    return this.context.state.editing;
  }

}

export default AppState;
