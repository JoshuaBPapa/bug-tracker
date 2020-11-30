import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import Card from '../../Card/Card';
import Priority from '../../Priority/Priority';
import DateTime from '../../DateTime/DateTime';
import Status from '../../Status/Status';
import AssignUsers from '../../AssignUsers/AssignUsers';
import DeleteItem from '../../ItemTools/DeleteItem/DeleteItem';
import Comments from '../../Comments/Comments';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import EditLink from '../../ItemTools/EditLink/EditLink';
import ItemTools from '../../ItemTools/ItemTools';
import Description from '../../Description/Description';

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
      <div className="Pages Ticket-Page">
        <Card header={data.title}>
          <Description>
            {data.description}
          </Description>
          <ItemTools>
            <EditLink url={`/tickets/ticket/${id}/edit`} itemType="ticket" />
            {/* only render DeleteItem for users with authlevel above 1 */}
            {userAuthLevel > 1 ? (
              <DeleteItem
                itemType="ticket"
                id={id} />
            ) : null}
          </ItemTools>
        </Card>
        <div className="flex-grid">
          <div className="row-1">
            <Card header="project">
              <Link
                className="project-link" 
                to={`/projects/project/${data.projectId}`}>
                {data.projectTitle}
              </Link>
            </Card>
            <Card header="created by">
              {data.createdBy ? data.createdBy : 'User deleted'}
            </Card>
            <Card header="created">
              <DateTime value={data.created} />
            </Card>
          </div>
          <div className="row-2">
            <Card header="status">
              <Status value={data.status} />
            </Card>
            <Card header="priority">
              <Priority value={data.priority} />
            </Card>
          </div>
        </div>
        <Card header="assigned users">
          <AssignUsers id={id} />
        </Card>
        <Card header="comments">
          <Comments id={id} />
        </Card>
      </div>
    );
  };

  return ticket;
};

export default Ticket;