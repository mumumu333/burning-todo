import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Todo } from './Todo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Todo />
  </StrictMode>
);