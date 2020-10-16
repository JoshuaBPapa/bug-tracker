import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';

import useAxios from '../../../hooks/useAxios';

const Project = ({ match }) => {
  const { id } = match.params;
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `/projects/project/${id}`);
  }, [sendRequest, id]);

  let project = <p>Loading...</p>;
  if (error) {
    project = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
   project = (
      <div>
        <PageTitle>
          {data.title}
        </PageTitle>
        {data.description}
        <Link to={`/tickets/create/${id}`}>
          Add a new ticket
        </Link>
        <Link to={`/projects/project/${id}/edit`}>
          Edit
        </Link>
        <DeleteItemContainer
          itemType="project"
          id={id} />
        <div>
          <TicketsTable ticketsAssignment={`/project/${id}`} />
        </div>
      </div>
    );
  }

  return project;
};

export default Project;