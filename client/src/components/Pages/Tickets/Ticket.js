import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import PageTitle from '../../PageTitle/PageTitle';
import Card from '../../Card/Card';
import Priority from '../../Priority/Priority';
import DateTime from '../../DateTime/DateTime';

import useFetch from '../../../hooks/useFetch';

const Ticket = ({ match }) => {
  const { data, error, sendRequest } = useFetch();
  const { id } = match.params;

  useEffect(() => {
    sendRequest('tickets/ticket/' + id);
  }, [sendRequest, id]);

  let ticket = <p>Loading...</p>;
  if (error) {
    ticket = (
      <FeedbackMessage>
        {error.message}
      </FeedbackMessage>
    );
  } else if (data) {
    ticket = (
      <div>
        <PageTitle>
          ticket id: {data.id}
        </PageTitle>
        <Card header={data.title} />
        <Card header="description">
          {data.description}
        </Card>
        <Card header="project">
          <Link to={'/projects/project/' + data.projectId}>
            {data.projectTitle}
          </Link>
        </Card>
        <Card header={"Created"}>
          <DateTime value={data.created} />
        </Card>
        <Card header="status">
          {data.status}
        </Card>
        <Card header="priority">
          <Priority value={data.priority} />
        </Card>
      </div>
    );
  };

  return ticket;
};

export default Ticket;