import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import Table from '../../Table/Table';
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

  const tableHeader = [
    {
      text: 'id',
      key: 'id'
    },
    {
      text: 'title',
      key: 'title'
    },
    {
      text: 'priority',
      key: 'priority'
    },
    {
      text: 'status',
      key: 'status'      
    },
    {
      text: 'users assigned',
      key: 'usersAssigned'
    },
    {
      text: 'created',
      key: 'created'
    }
  ];

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
          <TicketsStatusBarChart endpoint={`/project/${id}`} />
          <TicketsPriorityPieChart endpoint={`/project/${id}`} />
        </ChartsWrapper>
        <div>
          <Table
            initOrderBy="priority"
            initIsOrderAscending={false}
            endpoint={`tickets/project/${id}`}
            header={tableHeader} />
        </div>
      </div>
    );
  }

  return project;
};

export default withAuthLevelCheck(Project, 2);