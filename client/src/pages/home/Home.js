import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Hello, we're Block by Block</h5>
            <p>
              A neighborhood volunteer organization dedicated to improving west side housing <br />
              If you're interested in our progress, you can keep track of up-to-date information about the neighborhood on our <Link to='/map'>Map</Link>. Otherwise, you can contact us on our <a href="https://www.facebook.com/">Facebook Neighboorhood Group</a>.   
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;