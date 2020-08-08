import React from 'react';

const TableHeader = ({ header, click }) => (
  <th>
    <button onClick={click}>
      {header}
    </button>
  </th>
);

export default TableHeader;