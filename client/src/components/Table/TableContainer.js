import React, { useState, useEffect, cloneElement } from 'react';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import Pagination from './Pagination';

import useAxios from '../../hooks/useAxios';

const TableContainer = ({ children, header, endpoint, initOrderBy, initIsOrderAscending }) => {
  const [orderBy, setOrderBy] = useState(initOrderBy);
  const [isOrderAscending, setIsOrderAscending] = useState(initIsOrderAscending);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest(
      'GET', 
      `${endpoint}/${orderBy}-${isOrderAscending ? 'asc' : 'desc'}/${pageNumber}`
    );
  }, [endpoint, orderBy, isOrderAscending, pageNumber, sendRequest]);

  const handleHeaderCellClick = header => {
    // reverse the order of items if the current orderBy header is clicked
    if (orderBy === header) {
      setIsOrderAscending(!isOrderAscending);
    } else {
      setOrderBy(header);
      setIsOrderAscending(true);
    }

    setPageNumber(1);
  };

  // pass props to the child table
  const tableBody = cloneElement(
    children,
    {
      data: data,
    }
  );

  let tableContainer = <p>loading...</p>;
  if (error) {
    tableContainer = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    tableContainer = (
      <div className="Table-Container">
        <table>
          <TableHeader>
            {header.map(headerCell => {
              let activeClassName;
              if (headerCell.key === orderBy) {
                activeClassName = `active ${isOrderAscending ? 'asc' : 'desc'}`
              }

              return (
                <TableHeaderCell
                  key={headerCell.key}
                  clicked={handleHeaderCellClick}
                  activeClassName={activeClassName}
                  cellProps={headerCell} />
              );
            })}
          </TableHeader>
          <tbody>
            {tableBody}
          </tbody>
        </table>
        <Pagination
          pageNumber={pageNumber}
          totalPageCount={data.totalPages}
          totalResults={data.totalResults}
          clicked={setPageNumber} />
      </div>
    );
  }

  return tableContainer;
};

export default TableContainer;