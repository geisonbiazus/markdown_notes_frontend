import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import NotePresenter from '../../presenters/note_presenter';
import Note from '../../markdown_notes/note';
import AppState from '../../state_management/app_state';

class App extends Component {
  constructor(props) {
    super(props);
    this.appState = new AppState(this);
    this.noteUseCase = props.noteUseCase;
    this.presenter = new NotePresenter(this.appState);
    this.noteUseCase.listNotes(this.presenter);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.noteUseCase.createNote(this.state.note, this.presenter);
  }

  render() {
    return (
      <div className="App container-fluid">
        <NoteList
          notes={this.state.notes}
          />
        <NoteForm note={this.state.note}
          onTitleChange={event => this.appState.setNoteAttribute('title', event.target.value)}
          onContentChange={event => this.appState.setNoteAttribute('content', event.target.value)}
          onFormSubmit={this.onFormSubmit.bind(this)}
          />
      </div>
    );
  }
}

export default App;
