import { Before, Given, When, Then } from 'cucumber';
import expect from 'jest-matchers'
import InMemoryNoteRepository from '../../src/repositories/in_memory_note_repository';
import NoteUseCase from '../../src/markdown_notes/note_use_case';
import Note from '../../src/markdown_notes/note';
import { NotePresenterSpy } from '../../src/testing/doubles/note_presenter_doubles';

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
  note = new Note();
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
    expect(presenter.presentNoteArgs.note).toEqual(notes[notes.length-1]);
    done();
  })
});

When('I request to see the notes list', function (done) {
  presenter.done = done
  usecase.listNotes(presenter);
});

Then('I should see {int} notes', function (count) {
  expect(presenter.presentNoteListArgs.notes.length).toEqual(count);
});

Given('I have the following notes', function ({ rawTable }) {
  rawTable.forEach((item, i) => {
    if (i == 0) return;
    repository.createSync(new Note(item[0], item[1]));
  });
});

Then('I should see the following notes', function ( { rawTable }) {
  presenter.presentNoteListArgs.notes.forEach((note, i) => {
    expect(rawTable[i+1][0]).toEqual(note.title);
    expect(rawTable[i+1][1]).toEqual(note.content);
  });
});
