import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ clicked }) => (
  <nav>
    <ul>
      <li><Link to="/projects" onClick={clicked}>projects</Link></li>
      <li><Link to="/tickets" onClick={clicked}>tickets</Link></li>
      <li><Link to="/users" onClick={clicked}>users</Link></li>
    </ul>
  </nav>
);

export default Nav;