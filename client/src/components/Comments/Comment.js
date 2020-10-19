import React from 'react';

import DateTime from '../DateTime/DateTime';

const Comment = ({ title, content, author, datePosted }) => (
  <li>
    <div>
      {title}
    </div>
    <div>
      {content}
    </div>
    <div>
      {author}
      <DateTime value={datePosted} />
    </div>
  </li>
);

export default Comment;