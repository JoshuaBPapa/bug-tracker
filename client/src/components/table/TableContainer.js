import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';
import DateTime from '../DateTime/DateTime';
import Pagination from './Pagination';
import Priority from '../Priority/Priority';

const TableContainer = ({ contentUrl, endpoint, initOrderBy, initOrderAscending }) => {
  const [orderBy, setOrderBy] = useState(initOrderBy);
  const [orderAscending, setOrderAscending] = useState(initOrderAscending);
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data,
    error,
    fetchData
  } = useFetch();

  useEffect(() => {
    fetchData(`${endpoint}/${orderBy}-${orderAscending ? 'asc' : 'desc'}/${pageNumber}`);
  }, [endpoint, orderBy, orderAscending, fetchData, pageNumber]);

  const handleHeaderCellClick = (header) => {
    if (orderBy === header) {
      setOrderAscending(!orderAscending);
    } else {
      setOrderBy(header);
      setOrderAscending(true)
    }
    setPageNumber(1);
  };
  
  let table = <p>loading...</p>;
  if (error) {
    table = (
      <FeedbackMessage>
        {error.message}
      </FeedbackMessage>
    );
  } else if (data) {
    const headers = Object.keys(data.results[0]);

    table = (
      <div className="Table-Container">
        <table>
          <thead>
            <tr>
              {headers.map(header => {
                let props = {
                  key: header,
                  header: header,
                  clicked: handleHeaderCellClick
                }
                if (header === orderBy) {
                  props.activeClassName = `active ${orderAscending ? 'asc' : 'desc'}`
                }
                return <TableHeaderCell {...props} />
              })}
            </tr>
          </thead>
          <tbody>
            {data.results.map(row => (
              <tr key={row.id}>
                {headers.map(header => (
                  <TableCell key={header}>
                    {/* format cell data depending on its type */}
                    {header === 'title' ? (
                      <Link to={`${contentUrl}/${row.id}`}>
                        {row[header]}
                      </Link>
                    ) : header === 'created' || header === 'updated' ? (
                      <DateTime value={row[header]} />
                    ) : header === 'priority' ? (
                      <Priority value={row.priority} />
                    ) : row[header]}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination 
          pageNumber={pageNumber}
          totalPageCount={data.totalPages} 
          totalResults={data.totalResults}
          clicked={setPageNumber} />
      </div>
    )
  };
  return table;
};

export default TableContainer;