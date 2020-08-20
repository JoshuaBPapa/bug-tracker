import React from 'react';

const DateTime = ({ value }) => {
  const dateTime = new Date(value);

  return (
    <>
      {dateTime.toLocaleString('en-gb')}
    </>
  )
}

export default DateTime;