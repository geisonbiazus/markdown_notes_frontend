import { Given, When, Then } from 'cucumber';
import expect from 'jest-matchers'
import InMemoryNoteRepository from '../../src/repositories/in_memory_note_repository';
import NoteUseCase from '../../src/use_cases/note_use_case';

let repository;
let note;
let usecase;

Given('I have {int} notes', function (int) {
  repository = new InMemoryNoteRepository();
});

When('I create a new note', function () {
  note = {};
});

When('I set the {string} to {string}', function (field, value) {
  note[field] = value;
});

When('I save the note', function (done) {
  usecase = new NoteUseCase(repository);
  let presenter = new NotePresenterSpy(done);
  usecase.createNote(note, presenter);
});

Then('I should have {int} saved note', function (int) {
  repository.findAll().then((notes) => {
    expect(notes.length).toEqual(1);
  })
});

class NotePresenterSpy {
  constructor(done) {
    this.done = done;
  }

  presentNote(note) {
    this.done();
  }
}
