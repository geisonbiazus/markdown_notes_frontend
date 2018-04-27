import NotePresenter from './note_presenter';
import Note from '../markdown_notes/note';

describe("NotePresenter", () => {
  describe("presentNoteList", () => {
    it('sets the received notes to context state', () => {
      let context = new ContextSpy();
      let presenter = new NotePresenter(context);
      let notes = [new Note("Note 1"), new Note("Note 1")]

      presenter.presentNoteList(notes);
      expect(context.setStateArgs.state).toEqual({ notes });
    });
  });
});

class ContextSpy {
  constructor() {
    this.setStateArgs = {};
  }

  setState(state) {
    this.setStateArgs.state = state;
  }
}
