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
    noteRepository.createNoteResult = createdNote;
    usecase.createNote(note, presenter);
  });

  it('creates the note', () => {
    expect(noteRepository.createNoteArgs.note).toEqual(note);
  });

  describe('on success creation', () => {
    it('presents the result', () => {
      expect(presenter.presentNoteArgs.note).toEqual(createdNote);
    });
  });

});

class NoteRepositorySpy {
  constructor() {
    this.createNoteArgs = {};
  }

  create(note) {
    this.createNoteArgs.note = note;
    return new Promise((resolve, reject) => {
      resolve(this.createNoteResult);
    });
  }
}

class NotePresenterSpy {
  constructor() {
    this.presentNoteArgs = {};
  }

  presentNote(note) {
    this.presentNoteArgs.note = note;
    if (this.onPresentNote) this.onPresentNote(note);
  }
}
