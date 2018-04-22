import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHandler: this.props.appHandler,
    };
  }
  onClick = (e) => {
    this.state.appHandler(e.target.attributes.getNamedItem('data-pageIndex').value);
  };
  render() {
    return (
    <nav>
      <div className="nav-wrapper white">
        <div className="container">
          <a className="brand-logo green-text darken-1" data-pageindex="0" href="javascript:void(0)" onClick={this.onClick}>Block by Block Initiative</a>
        </div>
      </div>
    </nav>
    );
  }
}

export default Header;
