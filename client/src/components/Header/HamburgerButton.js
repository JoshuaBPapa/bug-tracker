import React from 'react';

const HamburgerButton = ({ clicked }) => (
  <button className="Hamburger-Button" onClick={clicked}>
    <span></span>
    <span></span>
    <span></span>
  </button>
);

export default HamburgerButton