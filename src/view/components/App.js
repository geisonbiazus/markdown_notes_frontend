import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import ShowNote from './ShowNote';
import NotePresenter from '../../presenters/note_presenter';
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
    this.noteUseCase.createNote(this.state.note, this.presenter);
  }

  render() {
    return (
      <div className="App container-fluid">
        <NoteList
          notes={this.state.notes}
          />

        <button className="btn btn-primary" onClick={() => this.appState.AddNewNote()}>
          Add New Note
        </button>

        {
          this.state.editing ? (
            <NoteForm note={this.state.note}
            onTitleChange={event => this.appState.setNoteAttribute('title', event.target.value)}
            onContentChange={event => this.appState.setNoteAttribute('content', event.target.value)}
            onFormSubmit={this.onFormSubmit.bind(this)}
            />
          ) : (
            <ShowNote note={this.state.note} />
          )
        }
      </div>
    );
  }
}

export default App;
