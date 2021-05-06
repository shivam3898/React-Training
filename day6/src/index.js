import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './style/style.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);