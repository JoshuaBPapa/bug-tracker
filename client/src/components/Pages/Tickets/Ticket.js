import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import Card from '../../Card/Card';
import Priority from '../../Priority/Priority';
import DateTime from '../../DateTime/DateTime';
import Status from '../../Status/Status';
import AssignUsersContainer from '../../AssignUsers/AssignUsersContainer';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';
import CommentsContainer from '../../Comments/CommentsContainer';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import EditLink from '../../EditLink/EditLink';
import ItemTools from '../../ItemTools/ItemTools';

import useAxios from '../../../hooks/useAxios';

const Ticket = () => {
  const { id } = useParams();
  const { data, error, sendRequest } = useAxios();
  const userAuthLevel = localStorage.getItem('authorisation-level');

  useEffect(() => {
    sendRequest('GET', `tickets/ticket/${id}`)
  }, [sendRequest, id]);

  let ticket = <LoadingSpinner />;
  if (error) {
    ticket = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    ticket = (
      <div>
        <Card header={data.title}>
          {data.description}
          <ItemTools>
            <EditLink url={`/tickets/ticket/${id}/edit`} itemType="ticket" />
            {/* only render DeleteItemContainer for users with authlevel above 1 */}
            {userAuthLevel > 1 ? (
              <DeleteItemContainer
                itemType="ticket"
                id={id} />
            ) : null}
          </ItemTools>
        </Card>
        <Card header="project">
          <Link to={`/projects/project/${data.projectId}`}>
            {data.projectTitle}
          </Link>
        </Card>
        <Card header="created by">
          {data.createdBy ? data.createdBy : 'User deleted'}
        </Card>
        <Card header="created">
          <DateTime value={data.created} />
        </Card>
        <Card header="status">
          <Status value={data.status} />
        </Card>
        <Card header="priority">
          <Priority value={data.priority} />
        </Card>
        {/* only render AssignUsersContainer for users with authlevel above 1 */}
        {userAuthLevel > 1 ? (
          <AssignUsersContainer id={id} />
        ) : null}
        <CommentsContainer id={id} />
      </div>
    );
  };

  return ticket;
};

export default Ticket;