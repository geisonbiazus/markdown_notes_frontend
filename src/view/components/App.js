import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteBody from './NoteBody';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <NoteList />
        <NoteBody />
      </div>
    );
  }
}

export default App;
