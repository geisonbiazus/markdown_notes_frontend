import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import NotePresenter from '../../presenters/note_presenter';
import Note from '../../markdown_notes/note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], note: { title: "Note Title", content: "Note Content" } };
    this.noteUseCase = props.noteUseCase;
    this.presenter = new NotePresenter(this);
    this.noteUseCase.listNotes(this.presenter);
  }

  onTitleChange(event) {
    this.setState({note: { ...this.state.note, title: event.target.value }});
  }

  onContentChange(event) {
    this.setState({note: { ...this.state.note, content: event.target.value, }});
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
          onTitleChange={this.onTitleChange.bind(this)}
          onContentChange={this.onContentChange.bind(this)}
          onFormSubmit={this.onFormSubmit.bind(this)}
          />
      </div>
    );
  }
}

export default App;
