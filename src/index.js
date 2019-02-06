import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './resources/css/app.css';
import { firebase } from './firebase';

const App = ({ user }) => (
  <BrowserRouter>
    <Routes user={user} />
  </BrowserRouter>
);

firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
});

