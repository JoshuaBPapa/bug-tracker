import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import CommentList from './CommentList';
import Comment from './Comment';

import useAxios from '../../hooks/useAxios';

const CommentsContainer = ({ id }) => {
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/ticket/${id}/comments`);
  }, [sendRequest, id]);

  let commentContent = <p>Loading...</p>;
  if (error) {
    commentContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    commentContent = (
      <CommentList>
        {data.map(comment => (
          <Comment
            key={comment.id}
            title={comment.title}
            content={comment.content}
            author={comment.name}
            datePosted={comment.created} />
        ))}
      </CommentList>
    );
  }

  return (
    <div>
      Comments
      <Link to={`/tickets/ticket/${id}/comment`}>
        add a comment
      </Link>
      {commentContent}
    </div>
  );
};

export default CommentsContainer;