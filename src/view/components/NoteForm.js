import React, { Component } from 'react';

class NoteForm extends Component {
  render() {
    const note = this.props.note;

    return (
      <section>
        <form onSubmit={this.props.onFormSubmit}>
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
