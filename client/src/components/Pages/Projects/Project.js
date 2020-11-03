import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';
import ChartsWrapper from '../../Charts/ChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';
import Card from '../../Card/Card';
import AddLink from '../../AddLink/AddLink';
import EditLink from '../../EditLink/EditLink';
import ItemTools from '../../ItemTools/ItemTools';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

import useAxios from '../../../hooks/useAxios';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Project = () => {
  const { id } = useParams();
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `/projects/project/${id}`);
  }, [sendRequest, id]);

  let project = <LoadingSpinner />;
  if (error) {
    project = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
   project = (
      <div>
        <Card header={data.title}>
          {data.description}
          <ItemTools>
            <AddLink url={`/tickets/create/${id}`} itemType="ticket" />
            <EditLink url={`/projects/project/${id}/edit`} itemType="project" />
            <DeleteItemContainer
              itemType="project"
              id={id} />
          </ItemTools>
        </Card>
        <ChartsWrapper>
          <TicketsStatusBarChart endpoint={`/project/${id}`}/>
          <TicketsPriorityPieChart endpoint={`/project/${id}`}/>
        </ChartsWrapper>
        <div>
          <TicketsTable ticketsAssignment={`/project/${id}`} />
        </div>
      </div>
    );
  }

  return project;
};

export default withAuthLevelCheck(Project, 2);