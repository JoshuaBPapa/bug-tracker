import React, { useEffect } from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TableContainer from '../../Table/TableContainer';
import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';

import useAxios from '../../../hooks/useAxios';

const Project = ({ match }) => {
  const { id } = match.params;
  const { data, error, getData } = useAxios();

  useEffect(() => {
    getData(`/projects/project/${id}`);
  }, [getData, id])

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
    );
  };

  return project;
}

export default Project;