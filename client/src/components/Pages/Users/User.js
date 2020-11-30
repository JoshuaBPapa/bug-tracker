import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import DeleteItem from '../../ItemTools/DeleteItem/DeleteItem';
import ChartsWrapper from '../../Charts/ChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';
import AuthorisationLevel from '../../AuthorisationLevel/AuthorisationLevel';
import Card from '../../Card/Card';
import EditLink from '../../ItemTools/EditLink/EditLink';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import PageTitle from '../../PageTitle/PageTitle';
import Table from '../../Table/Table';
import Description from '../../Description/Description';
import ItemTools from '../../ItemTools/ItemTools';
import ComponentSwitcher from '../../ComponentSwitcher/ComponentSwitcher';

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
      <div className="Pages User-Page">
        <Card header={data.name}>
          <Description>
            <p>
              <span className="bold">Job Title: </span>
              {data.jobTitle}
            </p>
            <p>
              <span className="bold">Authorisation Level: </span>
              <AuthorisationLevel value={data.authLevel} />
            </p>
            <p>
              <span className="bold">Username: </span>
              {data.username}
            </p>
            <p>
              <span className="bold">Email: </span>
              {data.email}
            </p>
          </Description>
          {/* add admin tools to the page if the user is an admin */}
          {userAuthLevel > 2 ? (
            <ItemTools>
              <EditLink url={`/users/user/${id}/edit`} itemType="user" />
              <Link
                className="item-tool"
                to={`/users/user/${id}/new_password`}>
                <img src={changePassword} alt="change password" />
                Change user's password
              </Link>
              <DeleteItem
                itemType="user"
                id={id} />
            </ItemTools>
          ) : null}
        </Card>
        <ComponentSwitcher componentTitles={data.authLevel > 1 ? (
          ['Assigned Tickets', 'Created Tickets']
        ) : (
          ['Assigned Tickets']
        )}>
          <>
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
          </>
          {/* fetch and display created tickets if the target user's auth level is > 1 */}
          {data.authLevel > 1 ? (
            <>
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
        </ComponentSwitcher>
      </div>
    );
  }

  return user;
};

export default User;