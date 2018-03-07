import React, { Component } from 'react';
import GetData from "./GetData"; // We can actually have something like an structure to react files this way
import Header from './components/header/header'
import './App.css'; // Also is import a JS thing? Or react?

class Welcome extends Component {
  render() {
    return (
      <div className=""> 
        Welcome
      </div>
    );
  }
}

export default Welcome;
