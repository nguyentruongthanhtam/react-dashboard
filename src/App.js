import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="City_name">
          <h1>City Name</h1>
        </header>
        <Dashboard />
      </div>
    );
  }
}

export default App;
