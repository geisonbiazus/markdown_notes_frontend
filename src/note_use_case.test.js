import NoteUseCase from './note_use_case';

const note = { title: 'title', content: 'content' };

let noteRepository;
let presenter;
let usecase;

beforeEach(() => {
  noteRepository = new NoteRepositorySpy();
  usecase = new NoteUseCase(noteRepository);
});

describe('createNote', () => {
  const createdNote = { id: 1, title: 'title', content: 'content' };

  let presenter;

  beforeEach(() => {
    presenter = new NotePresenterSpy();
    noteRepository.createdNote = createdNote;
    usecase.createNote(note, presenter);
  });

  test('it creates the note', () => {
    expect(noteRepository.createNoteArg).toEqual(note);
  });

  test('it presents the result', () => {
    expect(presenter.presentNoteNoteArg).toEqual(createdNote);
  });
});

class NoteRepositorySpy {
  create(note) {
    this.createNoteArg = note;
    return this.createdNote;
  }
}

class NotePresenterSpy {
  presentNote(note) {
    this.presentNoteNoteArg = note;
  }
}
