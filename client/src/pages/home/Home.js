import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHandler: this.props.appHandler,
    };
  }

  checkPassword = () => {
    fetch('/password', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          password: "abc123"
      })
    }).then(response => response.json())
    .then(body => { 
      console.log(body);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Hello, we're Block by Block</h5>
            <p>
              A neighborhood volunteer organization dedicated to improving west side housing <br />
              You can contact us on our <a href="https://www.facebook.com/">Facebook Neighboorhood Group</a>. 
              <a onClick={this.checkPassword}>TestPassword</a>  
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;