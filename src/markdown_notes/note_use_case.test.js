import NoteUseCase from './note_use_case';
import Note from './note';
import { NotePresenterSpy } from '../testing/doubles/note_presenter_doubles';

let note;
let noteRepository;
let presenter;
let usecase;

beforeEach(() => {
  note = new Note('title', 'content');
  noteRepository = new NoteRepositorySpy();
  presenter = new NotePresenterSpy();
  usecase = new NoteUseCase(noteRepository);
});

describe('createNote', () => {
  const createdNote =  new Note('title', 'content', 1);
  const creationError = 'Error';
  const notes = [ createdNote ];

  describe('on success creation', () => {
    beforeEach((done) => {
      // expect done to be called twice
      presenter.done = () => {
        presenter.done = done;
      };
      noteRepository.returnSuccessOnCreate(createdNote);
      noteRepository.returnSuccessOnFindAll(notes);
      usecase.createNote(note, presenter);
    });

    it('creates the note', () => {
      expect(noteRepository.createNoteArgs.note).toEqual(note);
    });

    it('presents the result', () => {
      expect(presenter.presentNoteArgs.note).toEqual(createdNote);
    });

    it('refreshes the note list', () => {
      expect(presenter.presentNoteListArgs.notes).toEqual(notes);
    });
  });

  describe('on creation fail', () => {
    beforeEach((done) => {
      presenter.done = done;
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
      presenter.done = done;
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
      presenter.done = done;
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
