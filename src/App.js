import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Containers from './containers/containers';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
        <div className="App">
            <h1>Hi! Welcome to the Movie React App!</h1>
            <Containers />
        </div>
        </BrowserRouter>
    );
  }
}

export default App;
