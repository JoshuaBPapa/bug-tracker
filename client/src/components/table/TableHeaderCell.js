import React from 'react';

const TableHeaderCell = ({ header, clicked, activeClassName }) => (
  <th>
    <button className={activeClassName} onClick={() => clicked(header)}>
      {header}
    </button>
  </th>
);

export default TableHeaderCell;