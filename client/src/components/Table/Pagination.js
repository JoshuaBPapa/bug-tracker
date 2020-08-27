import React from 'react';

const Pagination = ({ pageNumber, totalPageCount, totalResults, clicked }) => (
  <div>
    {pageNumber > 1 ? (
      <button onClick={() => clicked(() => pageNumber - 1)}>previous</button>
    ) : null}
    <span>page {pageNumber} out of {totalPageCount} | {totalResults} results </span>
    {pageNumber < totalPageCount ? (
      <button onClick={() => clicked(() => pageNumber + 1)}>next</button>
    ) : null}
  </div>
);

export default Pagination;