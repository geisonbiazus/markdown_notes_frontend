class NotePresenter {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  presentNote(note) {
    this.stateManager.setNote(note);
    this.stateManager.setEditing(false);
  }
  //
  // presentError(error) {
  // }
  //
  // presentValidation(errors) {
  // }

  presentNoteList(notes) {
    this.stateManager.setNotes(notes);
  }
}

export default NotePresenter;
