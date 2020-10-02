import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import PageTitle from '../../PageTitle/PageTitle';
import Card from '../../Card/Card';
import Priority from '../../Priority/Priority';
import DateTime from '../../DateTime/DateTime';
import Status from '../../Status/Status';

import useAxios from '../../../hooks/useAxios';

const Ticket = ({ match }) => {
  const { id } = match.params;
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/ticket/${id}`)
  }, [sendRequest, id]);

  let ticket = <p>Loading...</p>;
  if (error) {
    ticket = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    ticket = (
      <div>
        <PageTitle>
          ticket id: {data.id}
        </PageTitle>
        <Link to={`/tickets/ticket/${id}/edit`}>
          edit
        </Link>
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
          <Status value={data.status} />
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