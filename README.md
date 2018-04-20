# RopeUp

RopeUp is a mobile-first web application for meeting climbing partners. Climbers can create a profile, view matches in their area, and message them to RopeUp!

RopeUp was made in 2.5 weeks.

### Live URL: http://ropeup.surge.sh
#### Frontend: https://github.com/jdeam/ropeup-frontend
#### Backend: https://github.com/jdeam/ropeup-backend

## Features
- Managed state largely via Redux w/ Thunk middleware - more than two-thirds of the components used were stateless functional components.
- Implemented a real-time messaging system with features such as read/unread status and typing status indicators using SendBird’s JavaScript SDK.
- Styled eight unique views with Bulma CSS, and routed between them with React Router.
- Built a RESTful API using Node/Express, and stored all user data on a PostgreSQL database.

## Core Technologies
#### Frontend
- React
- React Router
- Redux / Thunk
- SendBird's JavaScript SDK

#### Backend
- Node / Express
- PostgreSQL
- bcrypt / JSON web tokens

## Screenshots
### Login / Signup / Welcome views:
![Login / signup / welcome views](screenshots/1-login-signup-welcome.gif)

### Dashboard-Edit view:
![Dashboard-edit view](screenshots/2-dashboard-edit.gif)

### Dashboard-Schedule view:
![Dashboard-schedule view](screenshots/3-dashboard-schedule.gif)

### Match list / detail views:
![Match list/detail views](screenshots/4-match-list-detail.gif)

### Message list / detail views:
![Message list/detail views](screenshots/5-message-detail-list.gif)
