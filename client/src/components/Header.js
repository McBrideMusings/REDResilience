import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHandler: this.props.appHandler,
    };
  }
  render() {
    return (
      <div className="container">
        <div className="row" role="navigation">
          <div className="col s6">
            <h3 className="valign-wrapper"><a>BlockByBlock</a></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
