import React, { Component } from 'react';

class NoteForm extends Component {
  onFormSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(event);
  }

  render() {
    const note = this.props.note;

    return (
      <section>
        <form onSubmit={event => this.onFormSubmit(event)}>
          <p>
            <input type="text" value={note.title} onChange={this.props.onTitleChange} />
          </p>
          <p>
            <textarea value={note.content} onChange={this.props.onContentChange} />
          </p>
          <p>
            <input type="submit" value="Create" />
          </p>
        </form>
      </section>
    );
  }
}

export default NoteForm;
