import React from 'react';
import { Link } from 'react-router-dom'

const Header = ({State}) => (
  <div className="row" role="navigation">
    <div className="col s6">
      <h3 className="valign-wrapper"><Link to='/'>{State}</Link></h3>
    </div>
  </div>
);

export default Header;