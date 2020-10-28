import React from 'react';
import { Link } from 'react-router-dom';

import home from '../../assets/icons/home.png';
import projects from '../../assets/icons/projects.png';
import tickets from '../../assets/icons/tickets.png';
import users from '../../assets/icons/users.png';
import team from '../../assets/icons/team.png';

const Nav = ({ clicked }) => {
  const userAuthLevel = Number(localStorage.getItem('authorisation-level'));
  const userId = localStorage.getItem('userId');
  const icons = {
    home: home,
    projects: projects,
    tickets: tickets,
    users: users,
    team: team
  }

  let links = [{
    title: 'home',
    url: `/users/user/${userId}`
  }];
  // add links for project managers and above
  if (userAuthLevel >= 2) {
    links.push(
      {
        title: 'projects',
        url: '/projects'
      },
      {
        title: 'tickets',
        url: '/tickets'
      },
      {
        title: 'users',
        url: '/users'
      }
    );
  }
  // add links for the master admin
  if (userAuthLevel === 4) {
    links.push({
      title: 'team',
      url: '/team'
    });
  }

  return (
    <nav>
      <ul>
        {links.map(link => (
          <li key={link.title} onClick={clicked}>
            <Link to={link.url}>
              <img src={icons[link.title]} alt={`${link.title}`} />
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;