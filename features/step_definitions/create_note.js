import { Before, Given, When, Then } from 'cucumber';
import expect from 'jest-matchers'
import InMemoryNoteRepository from '../../src/repositories/in_memory_note_repository';
import NoteUseCase from '../../src/use_cases/note_use_case';

let repository;
let note;
let usecase;
let presenter;

Before(() => {
  repository = new InMemoryNoteRepository();
  usecase = new NoteUseCase(repository);
  presenter = new NotePresenterSpy();
});

Given('I have no notes', function () {
  repository.clearNotes();
});

When('I create a new note', function () {
  note = {};
});

When('I set the {string} to {string}', function (field, value) {
  note[field] = value;
});

When('I save the note', function (done) {
  presenter.done = done;
  usecase.createNote(note, presenter);
});

Then('I should have {int} saved note', function (count, done) {
  repository.findAll().then((notes) => {
    expect(notes.length).toEqual(count);
    done();
  })
});

Then('I should see the created note', function (done) {
  repository.findAll().then((notes) => {
    expect(presenter.presentedNote).toEqual(notes[notes.length-1]);
    done();
  })
});


class NotePresenterSpy {
  constructor(done) {
    this.done = done;
  }

  presentNote(note) {
    this.presentedNote = note;
    this.done();
  }
}
