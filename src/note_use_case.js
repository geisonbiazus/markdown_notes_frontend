class NoteUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  createNote(note, presenter) {
    this.noteRepository.create(note).then((createdNote) => {
      presenter.presentNote(createdNote);
    }).catch((error) => {
      presenter.presentError(error);      
    });
  }
}

export default NoteUseCase;
