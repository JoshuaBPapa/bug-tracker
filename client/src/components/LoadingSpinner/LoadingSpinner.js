import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = ({ hasExtraMargin }) => (
  <div
    className="lds-ring"
    style={hasExtraMargin ? { margin: 5 + 'em auto' } : {}}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default LoadingSpinner;