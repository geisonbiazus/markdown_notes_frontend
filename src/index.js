import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'

import InMemoryNoteRepository from './repositories/in_memory_note_repository';
import NoteUseCase from './markdown_notes/note_use_case';
import Note from './markdown_notes/note';

const noteRepository = new InMemoryNoteRepository();
const noteUseCase = new NoteUseCase(noteRepository);

noteRepository.createSync(new Note("Note 1", "Content 1"));
noteRepository.createSync(new Note("Note 2", "Content 2"));
noteRepository.createSync(new Note("Note 3", "Content 3"));
noteRepository.createSync(new Note("Note 4", "Content 4"));
noteRepository.createSync(new Note("Note 5", "Content 5"));

ReactDOM.render(<App noteUseCase={noteUseCase}/>, document.getElementById('root'));
registerServiceWorker();
