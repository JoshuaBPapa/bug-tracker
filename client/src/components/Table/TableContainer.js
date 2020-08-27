import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import TableHeaderCell from './TableHeaderCell';
import TableCell from './TableCell';
import DateTime from '../DateTime/DateTime';
import Pagination from './Pagination';
import Priority from '../Priority/Priority';
import Status from '../Status/Status';

import useAxios from '../../hooks/useAxios';

const TableContainer = ({ contentUrl, endpoint, initOrderBy, initIsOrderAscending }) => {
  const [orderBy, setOrderBy] = useState(initOrderBy);
  const [isOrderAscending, setIsOrderAscending] = useState(initIsOrderAscending);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, getData } = useAxios();

  useEffect(() => {
    getData(`${endpoint}/${orderBy}-${isOrderAscending ? 'asc' : 'desc'}/${pageNumber}`);
  }, [endpoint, orderBy, isOrderAscending, getData, pageNumber]);

  const handleHeaderCellClick = (header) => {
    if (orderBy === header) {
      setIsOrderAscending(!isOrderAscending);
    } else {
      setOrderBy(header);
      setIsOrderAscending(true)
    }
    setPageNumber(1);
  };

  let table = <p>loading...</p>;
  if (error) {
    table = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    const headers = Object.keys(data.results[0] || data.results);
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
                  props.activeClassName = `active ${isOrderAscending ? 'asc' : 'desc'}`
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
                    {/* format cell data depending on its header */}
                    {header === 'title' ? (
                      <Link to={`${contentUrl}/${row.id}`}>
                        {row.title}
                      </Link>
                    ) : header === 'created' || header === 'updated' ? (
                      <DateTime value={row[header]} />
                    ) : header === 'priority' ? (
                      <Priority value={row.priority} />
                    ) : header === 'status' ? (
                      <Status value={row[header]} />
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