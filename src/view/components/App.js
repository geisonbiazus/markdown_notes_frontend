import React, { Component } from 'react';
import NoteContent from './NoteContent';
import NoteList from './NoteList';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <NoteList notes={this.props.notes} />

        <button className="btn btn-primary" onClick={() => this.props.appState.AddNewNote()}>
          Add New Note
        </button>

        <NoteContent
          note={this.props.note}
          editing={this.props.editing}
          onTitleChange={event => this.props.appState.setNoteAttribute('title', event.target.value)}
          onContentChange={event => this.props.appState.setNoteAttribute('content', event.target.value)}
          onFormSubmit={() => this.props.noteUseCase.createNote(this.props.note, this.props.notePresenter) } />
      </div>
    );
  }
}

export default App;
