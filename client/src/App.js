import React, { Component } from 'react';
import GetData from "./GetData"; // We can actually have something like an structure to react files this way
import Header from './components/header/header'
import './App.css'; // Also is import a JS thing? Or react?

class App extends Component {
  state = {
    screen: 0,
    test: null
  }

  componentDidMount() {
    fetch('/', {
      method: 'POST' 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({test: data});
    });
  }

  render() {
    return (
      <div className="App"> 
        <Header State="This"></Header>
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
