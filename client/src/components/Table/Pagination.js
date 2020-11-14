import React from 'react';

import prev from '../../assets/icons/prev.png';
import prevGreyed from '../../assets/icons/prevGreyed.png';
import next from '../../assets/icons/next.png';
import nextGreyed from '../../assets/icons/nextGreyed.png';

const Pagination = ({ pageNumber, totalPageCount, totalResults, clicked }) => (
  <div className="Pagination">
    {pageNumber > 1 ? (
      <button onClick={() => clicked(() => pageNumber - 1)}>
        <img src={prev} alt="previous page" />
      </button>
    ) : (
      <button onClick={() => clicked(() => pageNumber - 1)} disabled>
        <img src={prevGreyed} alt="previous page disabled" />
      </button>
    )}
    <span>Page {pageNumber} - {totalPageCount} | {totalResults} results</span>
    {pageNumber < totalPageCount ? (
      <button onClick={() => clicked(() => pageNumber + 1)}>
        <img src={next} alt="next page" />
      </button>
    ) : (
      <button onClick={() => clicked(() => pageNumber + 1)} disabled>
        <img src={nextGreyed} alt="next page disabled" />
      </button>
    )}
  </div>
);

export default Pagination;