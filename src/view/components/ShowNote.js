import React, { Component } from 'react';

class ShowNote extends Component {
  render() {
    const note = this.props.note;

    return (
      <section>
        <p>
          {note.title}
        </p>
        <p>
          {note.content}
        </p>
      </section>
    );
  }
}

export default ShowNote;
