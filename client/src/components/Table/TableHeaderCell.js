import React from 'react';

const TableHeaderCell = ({ clicked, activeClassName, cellProps }) => (
  <th className={activeClassName}>
    <button onClick={() => clicked(cellProps.key)}>
      {cellProps.text}
    </button>
  </th>
);

export default TableHeaderCell;