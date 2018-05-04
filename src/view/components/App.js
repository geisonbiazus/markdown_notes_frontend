import React, { Component } from 'react';
import NoteContent from './NoteContent';
import NoteList from './NoteList';

import InMemoryNoteRepository from '../../repositories/in_memory_note_repository';
import NoteUseCase from '../../markdown_notes/note_use_case';

import NotePresenter from '../../presenters/note_presenter';
import AppState from '../../state_management/app_state';

class App extends Component {
  constructor(props) {
    super(props)
    this.app = new MarkdownNotes(new AppState(this));
    this.app.listNotes();
  }

  render() {
    return (
      <div className="App container-fluid">
        <NoteList notes={this.app.getNotes()} />

        <button className="btn btn-primary" onClick={() => this.app.newNote() }>
          Add New Note
        </button>

        <NoteContent
          note={this.app.getNote()}
          editing={this.app.isEditing()}
          onTitleChange={event => this.app.setNoteTitle(event.target.value)}
          onContentChange={event => this.app.setNoteContent(event.target.value)}
          onFormSubmit={() => this.app.saveNote() } />
      </div>
    );
  }
}

export default App;

class MarkdownNotes {
  constructor(appState) {
    this.appState = appState;
    this.noteUseCase = new NoteUseCase(new InMemoryNoteRepository(true));
    this.notePresenter = new NotePresenter(this.appState);
  }

  getNotes() {
    return this.appState.getNotes();
  }

  getNote() {
    return this.appState.getNote();
  }

  isEditing() {
    return this.appState.isEditing();
  }

  listNotes() {
    this.noteUseCase.listNotes(this.notePresenter);
  }

  newNote() {
    this.appState.addNewNote();
  }

  setNoteTitle(title) {
    this.appState.setNoteAttribute('title', title);
  }

  setNoteContent(content) {
    this.appState.setNoteAttribute('content', content);
  }

  saveNote() {
    this.noteUseCase.createNote(this.getNote(), this.notePresenter);
  }
}
