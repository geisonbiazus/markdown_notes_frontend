class NotePresenter {
  constructor(context) {
    this.context = context;
  }
  //
  // presentNote(note) {
  // }
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
