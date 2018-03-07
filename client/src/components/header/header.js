import React from 'react';
import './header.css'; // Also is import a JS thing? Or react?

const Header = ({State}) => (
  <nav className="light-blue lighten-1" role="navigation">
    <div className="nav-wrapper container">
      <a id="logo-container" href="#" className="brand-logo">{State}</a>
      <ul className="right hide-on-med-and-down">
        <li><a href="#">Navbar Link</a></li>
      </ul>

      <ul id="nav-mobile" class="side-nav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
    </div>
  </nav>
);

export default Header;