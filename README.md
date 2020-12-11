
## Bug Tracker
A full stack web app built with React, Node, Express, and SQL. Bugs are tracked by creating tickets attached to projects. Users can then be assigned to these tickets.

 
When a user signs up, they can create other users linked to their team. These newly created users will then be able to login using the team name and given username & password. Created users can be given different levels of authorisation which restrict them to certain functions. Admin users have full access, meaning they can create, edit, update, and delete all items in a team (users, projects, and tickets). Project managers also have the same level of access apart from modifying users. Project managers and admins can assign tickets to all other users of the team. A basic user only has the authorisation to view, edit, and comment on the tickets assigned to them.

**Creating a Team**  
This can be done by signing up with a new account or by using the demo version.

**Creating a Project**  
Before tickets can be created, they must be assigned to a project. Creating a project can be done by navigating to the projects page and then clicking add project.

**Creating a Ticket**  
Tickets are added to a project on the project page. Click add ticket to be taken to the creation page. Upon creation, you will be redirected to the ticket’s page. Users can be assigned to the ticket on this page and comments can also be added to the ticket.

**Creating a User**  
Users can be created by clicking add user on the users page.

**Deleting a Team**  
The master admin only has access to this function. They can delete a team by navigating to the team page and then clicking delete team.
