import React, { Component } from 'react';
import ShowNote from './ShowNote';
import NoteForm from './NoteForm';

class NoteContent extends Component {
  renderShowNote() {
    return (
      <ShowNote note={this.props.note} />
    );
  }

  renderNoteForm() {
    return (
      <NoteForm note={this.props.note}
        onTitleChange={this.props.onTitleChange}
        onContentChange={this.props.onContentChange}
        onFormSubmit={this.props.onFormSubmit} />
    );
  }

  render() {
    if (this.props.editing)
      return this.renderNoteForm();
    else
      return this.renderShowNote();
  }
}

export default NoteContent;
