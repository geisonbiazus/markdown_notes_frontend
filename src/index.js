import React from 'react';
import ReactDOM from 'react-dom';
import MarkdownNotes from './view/components/MarkdownNotes';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(<MarkdownNotes />, document.getElementById('root'));
registerServiceWorker();
