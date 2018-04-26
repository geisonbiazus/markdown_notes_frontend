import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteBody from './NoteBody';
import NotePresenter from '../../presenters/note_presenter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [] };
    const presenter = new NotePresenter(this);
    props.noteUseCase.listNotes(presenter);
  }

  render() {
    return (
      <div className="App container-fluid">
        <NoteList notes={this.state.notes}/>
        <NoteBody />
      </div>
    );
  }
}

export default App;
