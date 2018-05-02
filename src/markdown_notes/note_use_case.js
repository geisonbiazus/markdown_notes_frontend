class NoteUseCase {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
  }

  createNote(note, presenter) {
    let errors = validateNote(note);
    if (errors) return presenter.presentValidation(errors);

    this.noteRepository.create(note).then((createdNote) => {
      presenter.presentNote(createdNote);
      this.listNotes(presenter);
    }).catch((error) => {
      presenter.presentError(error);
    });
  }

  listNotes(presenter) {
    this.noteRepository.findAll().then((notes) => {
      presenter.presentNoteList(notes);
    }).catch((error) => {
      presenter.presentError(error);
    });
  }
}

function validateNote(note) {
  const errors = {};
  if (note.title === "") errors.title = ['required'];
  return Object.keys(errors).length ? errors : null;
}

export default NoteUseCase;
