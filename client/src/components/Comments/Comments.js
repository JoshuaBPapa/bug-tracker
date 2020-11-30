import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import Comment from './Comment';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

const Comments = ({ id }) => {
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/ticket/${id}/comments`);
  }, [sendRequest, id]);

  let commentContent = <LoadingSpinner />;
  if (error) {
    commentContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    commentContent = (
      <ul>
        {data.map(comment => (
          <Comment
            key={comment.id}
            title={comment.title}
            content={comment.content}
            author={comment.name}
            datePosted={comment.created} />
        ))}
      </ul>
    );
  }

  return (
    <div className="Comments">
      <Link to={`/tickets/ticket/${id}/comment`}>
        Add a comment
      </Link>
      {commentContent}
    </div>
  );
};

export default Comments;