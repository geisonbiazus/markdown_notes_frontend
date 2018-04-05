class NoteUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  createNote(note, presenter) {
    const createdNote = this.noteRepository.create(note);
    console.log(createdNote);
    presenter.presentNote(createdNote);
  }
}

export default NoteUseCase;
