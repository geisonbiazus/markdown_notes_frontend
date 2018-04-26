import React, { Component } from 'react';

class NoteList extends Component {
  render() {
    return (
      <section>
        <h2>Note List</h2>
        <ul>
          {this.props.notes.map((note) => {
            return <li key={note.id}>{note.title}</li>;
          })}
        </ul>
      </section>
    );
  }
}

export default NoteList;
