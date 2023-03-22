# User CRUD and Events Relation Application

This is a simple CRUD application that allows users to create, read, update and delete users and events. Each user can have multiple events associated with them.

# Features

The following features are available in this application:

- Create user
- Read user
- Update user
- Delete user
- Create event
- Read event
- Pagination and sorting by fields
- User dashboard displaying all created users, along with events count and next event date
- User profile page displaying user info and related events

# Technology Stack

The application uses the following technologies:

- JavaScript ES6+
- Vue.js
- Node.js
- MongoDB
- Express.js
- Github

# Getting Started

To get started with the application, follow these steps:

1. Clone CRUD_APP:
``` console
https://github.com/KrisPlanka/crud_app.git
```

2. Proceed to server directory
``` console
cd server
```

3. Type following commands:
``` console
npm install
```

4. Run npm start
``` console
npm start
```

5. Open new terminal window
6. Proceed to client directory
``` console
cd ..
```
``` console
cd client
```
7. Type following commands:
``` console
npm install
```
8. Run npm run dev
``` console
npm run dev
```

# Usage

To use the application, follow these steps:

1. Create a new user by clicking on the "Create User" button on the main page and filling in the required fields (firstName, lastName, email, phoneNumber).
2. Once a user is created, they will appear in the user dashboard on the main page along with the number of events associated with them and the start date of their next event.
3. To view a user's profile page, click on their name in the user dashboard table.
4. On the user profile page, you can create a new event for that user by clicking on the "Create Event" button and filling in the required fields (title, description, startDate, endDate).
5. If you try to create an event for a time when another event is already scheduled, you will receive a validation message informing you that you cannot create an event for that time.

