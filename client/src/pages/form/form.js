import React, { Component } from 'react';

class Form extends Component {
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

export default Form;