import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Chart />
        </header>
      </div>
    );
  }
}

export default App;
