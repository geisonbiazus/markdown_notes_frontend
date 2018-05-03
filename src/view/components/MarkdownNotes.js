import React, { Component } from 'react';
import NotePresenter from '../../presenters/note_presenter';
import AppState from '../../state_management/app_state';
import App from './App';

import InMemoryNoteRepository from '../../repositories/in_memory_note_repository';
import NoteUseCase from '../../markdown_notes/note_use_case';
import Note from '../../markdown_notes/note';

class MarkdownNotes extends Component {
  constructor(props) {
    super(props);
    this.appState = new AppState(this);
    this.noteUseCase = new NoteUseCase(new InMemoryNoteRepository(true));
    this.notePresenter = new NotePresenter(this.appState);
    this.noteUseCase.listNotes(this.notePresenter);
  }

  render() {
    return (
      <App
        noteUseCase={this.noteUseCase}
        notePresenter={this.notePresenter}
        appState={this.appState}
        note={this.state.note}
        notes={this.state.notes}
        editing={this.state.editing} />
      );
  }
}

export default MarkdownNotes;
