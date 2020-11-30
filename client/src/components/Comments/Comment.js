import React from 'react';

import DateTime from '../DateTime/DateTime';

const Comment = ({ title, content, author, datePosted }) => (
  <li className="Comment">
    <div className="Comment-title">
      {title}
    </div>
    <div className="Comment-content">
      {content}
    </div>
    <div className="Comment-author-date-time">
      {author} · <DateTime value={datePosted} />
    </div>
  </li>
);

export default Comment;