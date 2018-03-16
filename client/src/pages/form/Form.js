import React, { Component } from 'react';
import tempData from '../../tempData.json';

class Form extends Component {
  state = {
    screen: 0,
    test: null
  }

  componentDidMount() {
    console.log(tempData);
    /*
    fetch('/', {
      method: 'POST' 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({test: data});
    });
    */
  }

  render() {
    return (
      <div className="row">
        <div className="col s6 blue flex flex-column">
          <div>
            {tempData.houses[0].address}
          </div>
          <div>
            {tempData.houses[0].address}
          </div>
          <div>
            {tempData.houses[0].address}
          </div>
          <div>
            {tempData.houses[0].address}
          </div>
          <div>
            {tempData.houses[0].address}
          </div>
        </div>
        <div className="col s6 red">asdas</div>
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
