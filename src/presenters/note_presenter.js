class NotePresenter {
  constructor(context) {
    this.context = context;
  }
  //
  presentNote(note) {
    this.context.noteUseCase.listNotes(this);    
  }
  //
  // presentError(error) {
  // }
  //
  // presentValidation(errors) {
  // }

  presentNoteList(notes) {
    this.context.setState({notes});
  }
}

export default NotePresenter;
