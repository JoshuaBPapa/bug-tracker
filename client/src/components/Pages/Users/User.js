import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import DeleteItemContainer from '../../DeleteItem/DeleteItemContainer';
import ChartsWrapper from '../../Charts/ChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';
import AuthorisationLevel from '../../AuthorisationLevel/AuthorisationLevel';
import Card from '../../Card/Card';
import EditLink from '../../EditLink/EditLink';
import ItemTools from '../../ItemTools/ItemTools';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

import useAxios from '../../../hooks/useAxios';

import changePassword from '../../../assets/icons/changePassword.png';

const User = () => {
  const { id } = useParams();
  const { data, error, sendRequest } = useAxios();
  const userAuthLevel = localStorage.getItem('authorisation-level');

  useEffect(() => {
    sendRequest('GET', `users/user/${id}`);
  }, [sendRequest, id, userAuthLevel]);

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
        <ChartsWrapper>
          <TicketsStatusBarChart endpoint={`/user_tickets/${id}`} />
          <TicketsPriorityPieChart endpoint={`/user_tickets/${id}`} />
        </ChartsWrapper>
        <TicketsTable ticketsAssignment={`/user/assigned/${id}`} />
        {/* fetch and display created tickets data if the selected user's auth level is > 1 */}
        {data.authLevel > 1 ? (
          <>
            <ChartsWrapper>
              <TicketsStatusBarChart endpoint={`/user/${id}`} />
              <TicketsPriorityPieChart endpoint={`/user/${id}`} />
            </ChartsWrapper>
            <TicketsTable ticketsAssignment={`/user/created/${id}`} />
          </>
        ) : null}
      </div>
    );
  }

  return user;
};

export default User;