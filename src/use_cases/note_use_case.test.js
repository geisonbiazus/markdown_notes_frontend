import NoteUseCase from './note_use_case';

let note;
let noteRepository;
let presenter;
let usecase;

beforeEach(() => {
  note = { title: 'title', content: 'content' };
  noteRepository = new NoteRepositorySpy();
  presenter = new NotePresenterSpy();
  usecase = new NoteUseCase(noteRepository);
});

describe('createNote', () => {
  const createdNote = { id: 1, title: 'title', content: 'content' };
  const creationError = 'Error';

  describe('on success creation', () => {
    beforeEach((done) => {
      presenter.onPresentNote = () => { done(); };
      noteRepository.returnSuccessOnCreate(createdNote);
      usecase.createNote(note, presenter);
    });

    it('creates the note', () => {
      expect(noteRepository.createNoteArgs.note).toEqual(note);
    });

    it('presents the result', () => {
      expect(presenter.presentNoteArgs.note).toEqual(createdNote);
    });
  });

  describe('on creation fail', () => {
    beforeEach((done) => {
      presenter.onPresentError = () => { done(); };
      noteRepository.returnErrorOnCreate(creationError);
      usecase.createNote(note, presenter);
    });

    it('presents error', () => {
      expect(presenter.presentErrorArgs.error).toEqual(creationError);
    })
  });

  describe("with invalid attributes", () => {
    const validationErrors = { title: ['required'] };

    beforeEach(() => {
      note.title = '';
      usecase.createNote(note, presenter);
    });

    it("presents the invalid fields and messages", () => {
      expect(presenter.presentValidationArgs.errors).toEqual(validationErrors);
    });
  })
});

describe('listNotes', () => {
  describe('on success list', () => {
    const notes = [{id: 1, title: 'title', content: 'content'}];

    beforeEach((done) => {
      noteRepository.returnSuccessOnFindAll(notes);
      presenter.onPresentNoteList = () => { done(); };
      usecase.listNotes(presenter);
    });

    it('fetchs all notes and presents them', () => {
      expect(presenter.presentNoteListArgs.notes).toEqual(notes);
    });
  });

  describe('on error list', () => {
    const error = 'error';

    beforeEach((done) => {
      noteRepository.returnErrorOnFindAll(error);
      presenter.onPresentError = () => { done(); };
      usecase.listNotes(presenter);
    });

    it('presents the error', () => {
      expect(presenter.presentErrorArgs.error).toEqual(error);
    });
  });
});

class NoteRepositorySpy {
  constructor() {
    this.createNoteArgs = {};
  }

  create(note) {
    this.createNoteArgs.note = note;
    return this.createPromise;
  }

  returnSuccessOnCreate(createdNote) {
    this.createPromise = new Promise((resolve, reject) => {
      resolve(createdNote);
    });
  }

  returnErrorOnCreate(error) {
    this.createPromise = new Promise((resolve, reject) => {
      reject(error);
    });
  }

  findAll() {
    return this.findAllPromise;
  }

  returnSuccessOnFindAll(notes) {
    this.findAllPromise = new Promise((resolve, reject) => {
      resolve(notes);
    });
  }

  returnErrorOnFindAll(error) {
    this.findAllPromise = new Promise((resolve, reject) => {
      reject(error);
    });
  }
}

export class NotePresenterSpy {
  constructor() {
    this.presentNoteArgs = {};
    this.presentErrorArgs = {};
    this.presentValidationArgs = {};
    this.presentNoteListArgs = {};
  }

  presentNote(note) {
    this.presentNoteArgs.note = note;
    if (this.onPresentNote) this.onPresentNote(note);
  }

  presentError(error) {
    this.presentErrorArgs.error = error;
    if (this.onPresentError) this.onPresentError(error);
  }

  presentValidation(errors) {
    this.presentValidationArgs.errors = errors;
    if (this.onPresentValidation) this.onPresentValidation(errors);
  }

  presentNoteList(notes) {
    this.presentNoteListArgs.notes = notes;
    if (this.onPresentNoteList) this.onPresentNoteList(notes);
  }
}
