import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Pagination from './Pagination';
import Priority from '../Priority/Priority';
import Status from '../Status/Status';
import DateTime from '../DateTime/DateTime';
import AuthorisationLevel from '../AuthorisationLevel/AuthorisationLevel';

import useAxios from '../../hooks/useAxios';

import sortUp from '../../assets/icons/sortUp.png';
import sortDown from '../../assets/icons/sortDown.png';

const TableContainer = ({ initOrderBy, initIsOrderAscending, endpoint, header, itemType }) => {
  const [orderBy, setOrderBy] = useState(initOrderBy ? initOrderBy : 'id');
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

  const setTableCellFormat = (column, rowData) => {
    switch (column) {
      // title - link to the item's page
      case 'title':
        return (
          <Link to={`/${itemType}s/${itemType}/${rowData.id}`}>
            {rowData.title}
          </Link>
        );
      // name - link to the users's page
      case 'name':
        return (
          <Link to={`/users/user/${rowData.id}`}>
            {rowData.name}
          </Link>
        );
      // priority
      case 'priority':
        return <Priority value={rowData.priority} />;
      // status
      case 'status':
        return <Status value={rowData.status} />;
      // authorisation level
      case 'authLevel':
        return <AuthorisationLevel value={rowData.authLevel} />;
      // project link
      case 'projectId':
        return (
          <Link to={`/projects/project/${rowData.projectId}`}>
            {rowData.projectTitle}
          </Link>
        );
      // date created
      case 'created':
        return <DateTime value={rowData.created} />
      default:
        return rowData[column];
    }
  };

  let tableContent = <LoadingSpinner />;
  if (error) {
    tableContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    tableContent = (
      <>
        <Pagination
          pageNumber={pageNumber}
          totalPageCount={data.totalPages}
          totalResults={data.totalResults}
          clicked={setPageNumber} />
        <table>
          <thead>
            <tr>
              {header.map(headerCell => {
                const isOrderedBy = headerCell.key === orderBy;

                return (
                  <th 
                    key={headerCell.key}
                    className={headerCell.text.replace(' ', '-')}>
                    <button 
                      onClick={() => handleHeaderCellClick(headerCell.key)}>
                      {headerCell.text}
                      {isOrderedBy ? (
                        <img 
                          src={isOrderAscending ? sortUp : sortDown} 
                          alt={isOrderAscending ? 'ascending' : 'descending'} />
                      ) : null}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.results.map(row => (
              <tr key={row.id}>
                {header.map(column => (
                  <td 
                    key={column.key}
                    className={column.text.replace(' ', '-')}>
                    {setTableCellFormat(column.key, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div className="Table-Container">
      {tableContent}
    </div>
  );
};

export default TableContainer;