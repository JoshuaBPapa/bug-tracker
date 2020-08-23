import React from 'react';

const Card = ({ header, children }) => (
  <div>
    {header ? (
      <div>
        <h4>{header}</h4>
      </div>
    ) : null}
    {children ? (
      <div>
        {children}
      </div>
    ) : null}
  </div>
);

export default Card;