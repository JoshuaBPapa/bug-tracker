import React from 'react';

const TableHeader = ({ children }) => (
  <thead>
    <tr>
      {children}
    </tr>
  </thead>
);

export default TableHeader;