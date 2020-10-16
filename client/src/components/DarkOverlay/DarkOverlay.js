import React from 'react';

const DarkOverlay = ({ clicked, overlayClass }) => (
  <div className={`Dark-Overlay ${overlayClass}`} onClick={clicked} /> 
);

export default DarkOverlay;