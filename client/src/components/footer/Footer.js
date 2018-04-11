import React from 'react';
import { Link } from 'react-router-dom'

const Footer = () => (
<footer className="page-footer green darken-1">
    <div className="container">
        <div className="row">
            <div className="col l6 s6">
                <Link to='/form' className="white-text upload-link">Upload New Data</Link>
            </div>
            <div className="col l4 offset-l2 s6 right">
                <div className="right">Built by <a className="text-basic" href="http://dm.lmc.gatech.edu/"><b><span className="text-red">RED</span> ATL</b></a></div>
            </div>
        </div>
    </div>
    <div className="footer-copyright">
        <div className="container">
            © 2018 BlockByBlock
        </div>
    </div>
</footer>
);

export default Footer;