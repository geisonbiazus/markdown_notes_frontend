import Note from './note';

describe('Note', () => {
  let note;

  beforeEach(() => {
    note = new Note("Title", "Content", 42);
  });

  describe('duplicate', () => {
    it('duplicates the note', () => {
      const copy = note.duplicate();
      expect(copy).toEqual(note);
    });
  });
});
