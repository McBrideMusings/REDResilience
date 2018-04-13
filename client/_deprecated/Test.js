import React, { Component } from 'react';

class Test extends Component {
  state = {test: undefined};

  componentDidMount() {
    fetch('/data', {
      method: 'GET' 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({test: data});
    });
  }

  render() {
    if (this.state.test !== undefined) {
      return (
        <div className="row">
          <div className="col s12 flex flex-column">
            {this.state.test.map((element) =>
              <div key={element.id}>{element.fullAddress}</div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col s12 flex flex-column">
            loading data....
          </div>
        </div>
      );
    }
  }

  checkState() { // This is hyper-specific and bad and assumes the data never fails to be passed
    if (this.state.test === null) {
      return [];
    }
    return this.state.test.results[0].sheets;
  }
}

export default Test;