import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import NotePresenter from '../../presenters/note_presenter';
import Note from '../../markdown_notes/note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], note: new Note("Note Title", "Note Content") };
    this.noteUseCase = props.noteUseCase;
    this.presenter = new NotePresenter(this);
    this.noteUseCase.listNotes(this.presenter);
  }

  setNoteAttribute(key, value) {
    const note = this.state.note.duplicate();
    note[key] = value;
    this.setState({note: note});
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
          onTitleChange={event => this.setNoteAttribute('title', event.target.value)}
          onContentChange={event => this.setNoteAttribute('content', event.target.value)}
          onFormSubmit={this.onFormSubmit.bind(this)}
          />
      </div>
    );
  }
}

export default App;
