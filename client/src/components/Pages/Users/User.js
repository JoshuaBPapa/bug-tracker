import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';
import ChartsWrapper from '../../Charts/ChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';
import AuthorisationLevel from '../../AuthorisationLevel/AuthorisationLevel';
import Card from '../../Card/Card';
import EditLink from '../../EditLink/EditLink';
import ItemTools from '../../ItemTools/ItemTools';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import PageTitle from '../../PageTitle/PageTitle';
import Table from '../../Table/Table';

import useAxios from '../../../hooks/useAxios';

import changePassword from '../../../assets/icons/changePassword.png';

const User = () => {
  const { id } = useParams();
  const { data, error, sendRequest } = useAxios();
  const userAuthLevel = localStorage.getItem('authorisation-level');

  useEffect(() => {
    sendRequest('GET', `users/user/${id}`);
  }, [sendRequest, id, userAuthLevel]);

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
      text: 'created',
      key: 'created'
    },
    {
      text: 'project',
      key: 'projectId'
    }
  ];

  let user = <LoadingSpinner />;
  if (error) {
    user = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    user = (
      <div className="User">
        <Card header={data.name}>
          <div>
            <span className="bold">Job Title: </span>
            {data.jobTitle}
          </div>
          <div>
            <span className="bold">Authorisation Level: </span>
            <AuthorisationLevel value={data.authLevel} />
          </div>
          <div>
            <span className="bold">Username: </span>
            {data.username}
          </div>
          <div>
            <span className="bold">Email: </span>
            {data.email}
          </div>
          {/* add admin tools to the page if the user is an admin */}
          {userAuthLevel > 2 ? (
            <ItemTools>
              <EditLink url={`/users/user/${id}/edit`} itemType="user" />
              <Link to={`/users/user/${id}/new_password`}>
                <img src={changePassword} alt="change password" />
                change user's password
              </Link>
              <DeleteItemContainer
                itemType="user"
                id={id} />
            </ItemTools>
          ) : null}
        </Card>
        <PageTitle>
          Assigned Tickets
        </PageTitle>
        <ChartsWrapper>
          <TicketsStatusBarChart endpoint={`/user_tickets/${id}`} />
          <TicketsPriorityPieChart endpoint={`/user_tickets/${id}`} />
        </ChartsWrapper>
        <Table
          itemType="ticket"
          initOrderBy="priority"
          initIsOrderAscending={false}
          endpoint={`tickets/user/assigned/${id}`}
          header={tableHeader} />
        {/* fetch and display created tickets if the target user's auth level is > 1 */}
        {data.authLevel > 1 ? (
          <>
            <PageTitle>
              Created Tickets
            </PageTitle>
            <ChartsWrapper>
              <TicketsStatusBarChart endpoint={`/user/${id}`} />
              <TicketsPriorityPieChart endpoint={`/user/${id}`} />
            </ChartsWrapper>
            <Table
              itemType="ticket"
              initOrderBy="priority"
              initIsOrderAscending={false}
              endpoint={`tickets/user/created/${id}`}
              header={tableHeader} />
          </>
        ) : null}
      </div>
    );
  }

  return user;
};

export default User;