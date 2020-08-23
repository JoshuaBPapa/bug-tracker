import React, { useEffect } from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TableContainer from '../../DataTable/TableContainer';
import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';

import useFetch from '../../../hooks/useFetch';

const Project = ({ match }) => {
  const { data, error, sendRequest } = useFetch();
  const { id } = match.params;

  useEffect(() => {
    sendRequest('projects/project/' + id);
  }, [sendRequest, id])

  let project = <p>Loading...</p>;
  if (error) {
    project = (
      <FeedbackMessage>
        {error.message}
      </FeedbackMessage>
    );
  } else if (data) {
    project = (
      <div>
        <PageTitle>
          {data.title}
        </PageTitle>
        {data.description}
        <div>
          tickets
        <TableContainer
            contentUrl="/tickets/ticket"
            endpoint={`tickets/project/${id}`}
            initOrderBy="created"
            initIsOrderAscending={false} />
        </div>
      </div>
    )
  };

  return project;
}

export default Project;