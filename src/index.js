import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalStyle } from './styles/globalStyle';
import reportWebVitals from './reportWebVitals';
import { Router as BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
