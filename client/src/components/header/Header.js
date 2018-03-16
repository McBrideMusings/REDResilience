import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({useContainer}) => (
  <div className="container">
    <div className="row" role="navigation">
      <div className="col s6">
        <h3 className="valign-wrapper"><Link to='/'>BlockByBlock</Link></h3>
      </div>
    </div>
  </div>
);

export default Header;
