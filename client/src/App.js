import React, { Component } from 'react';
import GetData from "./GetData"; // We can actually have something like an structure to react files this way
import './App.css'; // Also is import a JS thing? Or react?

class App extends Component {
  state = {test: null} // State as far as I can tell is just an object we can store whatever in that forces a rerender when set with setState

  componentDidMount() {
    fetch('/', {
      method: 'POST' // I think I should be using the header and body sections but it worked without it for now
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({test: data});
    });
    /*
    fetch('/data', {
      method: 'POST' // I think I should be using the header and body sections but it worked without it for now
    })
    .then(res => console.log(res)); 
    */
  }

  render() {
    return (
      <div className="App"> 
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.checkState().map(sheet => 
          <div key={sheet.id}>{sheet.fulladdress}</div>
        )}
      </div>
    );
  }

  checkState() { // This is hyper-specific and bad and assumes the data never fails to be passed
    if (this.state.test === null) {
      return [];
    }
    return this.state.test.results[0].sheets;
  }
}

export default App;
