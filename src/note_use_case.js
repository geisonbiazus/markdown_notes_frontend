class NoteUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  createNote(note, presenter) {
    this.noteRepository.create(note).then((createdNote) => {
      presenter.presentNote(createdNote);
    });
  }
}

export default NoteUseCase;
