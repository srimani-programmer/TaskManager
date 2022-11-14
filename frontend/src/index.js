import React from 'react';
import ReactDOM from 'react-dom/client';
import Todo from './components/todo/todo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>
);