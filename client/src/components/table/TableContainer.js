import React, { useState, useEffect } from 'react';

import TableHeader from './TableHeader';
import Cell from './Cell';
import Pagination from './Pagination';

const TableContainer = () => {
  const [tableData, setListData] = useState();
  const [sortBy, setSortBy] = useState('created-at');

  useEffect(() => {
    fetch('http://localhost:8080/projects')
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('no projects found')
      })
      .then(data => {
        setListData(data);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  let table = <p>Attempting to fetch data...</p>
  if (tableData) {
    const tableHeaders = Object.keys(tableData[0]);
    const rows = tableData.map(row => (
      <tr key={row.id}>
        {tableHeaders.map(header => (
          <Cell
            key={header}
            cellname={header}
            cellValue={row[header]}
            rowId={row.id} />
        ))}
      </tr>
    ));
    
    table = (
      <div className="TableContainer">
        <table>
          <thead>
            <tr>
              {tableHeaders.map(header => (
                <TableHeader
                  key={header}
                  header={header}
                  click={() => setSortBy(header)} />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <Pagination />
      </div>
    );
  };

  return (
    table
  );
};

export default TableContainer;