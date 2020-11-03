import React from 'react';

const Card = ({ header, children }) => (
  <div className="Card">
    {header ? (
      <div className="card-header">
        <h3>{header}</h3>
      </div>
    ) : null}
    {children ? (
      <div className="card-body">
        {children}
      </div>
    ) : null}
  </div>
);

export default Card;