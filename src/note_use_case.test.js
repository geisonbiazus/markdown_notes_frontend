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

  beforeEach((done) => {
    presenter = new NotePresenterSpy();
    presenter.onPresentNote = () => {
      done();
    };
    noteRepository.createdNote = createdNote;
    usecase.createNote(note, presenter);
  });

  it('creates the note', () => {
    expect(noteRepository.createNoteArg).toEqual(note);
  });

  it('presents the result', () => {
    expect(presenter.presentedNote).toEqual(createdNote);
  });
});

class NoteRepositorySpy {
  create(note) {
    this.createNoteArg = note;
    return new Promise((resolve, reject) => {
      resolve(this.createdNote);
    });
  }
}

class NotePresenterSpy {
  presentNote(note) {
    this.presentedNote = note;
    if (this.onPresentNote) this.onPresentNote(note);
  }
}
