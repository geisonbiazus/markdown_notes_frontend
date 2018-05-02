class NotePresenter {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }
  //
  presentNote(note) {
    this.stateManager.context.noteUseCase.listNotes(this);
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
