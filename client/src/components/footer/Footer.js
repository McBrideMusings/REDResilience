import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="container">
  <div className="row">
    <div className="col s6">
      <Link to='/form' className="text-muted">Upload New Data</Link>
    </div>
    <div className="col s6 right-align text-muted">
      Built by <a className="text-basic" href="http://dm.lmc.gatech.edu/"><b><span className="text-red">RED</span> ATL</b></a>
    </div>
  </div>
  </div>
);

export default Footer;