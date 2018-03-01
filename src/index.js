import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import StickyLayout from './main';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<StickyLayout />, document.getElementById('root'));
registerServiceWorker();
