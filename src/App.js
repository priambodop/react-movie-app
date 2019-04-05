import React, { Component } from 'react';
import './App.css';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div>
            <h1>Hi! Welcome to the Movie React App!</h1>
            <Login />
          </div>
      </div>
    );
  }
}

export default App;
