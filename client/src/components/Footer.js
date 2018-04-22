import React, { Component } from 'react';
import { isNumber } from 'util';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHandler: this.props.appHandler
    };
  }
  onClick = (e) => {
    this.state.appHandler(e.target.attributes.getNamedItem('data-pageIndex').value);
  };
  render() {
    return (
      <footer className="page-footer green darken-1">
        <div className="container">
          <div className="row">
            <div className="col l6 s6">
              <a data-pageindex="1" onClick={this.onClick} href="javascript:void(0)" className="white-text upload-link">Add New Code Violation</a>
            </div>
            <div className="col l4 offset-l2 s6 right">
              <div className="right">Built by <a className="text-basic" href="http://dm.lmc.gatech.edu/"><b><span className="text-red">RED</span> ATL</b></a></div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2018 Block by Block Initiative
          </div>
        </div>
      </footer>
    );
  }
}
  
export default Footer;