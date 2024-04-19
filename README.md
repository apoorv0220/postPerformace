Here's the provided text converted to Markdown format:

---

# Documentation for Facebook Post Performance Dashboard
`Note - backend is deployed on free service so fetching takes some time.`
https://post-performace.vercel.app/

## Introduction
This documentation outlines the development process for creating a separate dashboard application to display Facebook post performance metrics. The application will utilize Facebook APIs to retrieve post data and visualize it through a dashboard UI built with React and Node.js. The application will be deployed using Vercel.

## Objectives
- Retrieve Facebook post data using Facebook APIs.
- Display post performance metrics such as likes, comments, shares, and engagement rate.
- Develop a dashboard UI using React for visualization.
- Implement a backend using Node.js to handle authentication.
- Deploy the application on Vercel for accessibility.

## Steps to Achieve
### Setup Facebook Developer Account and Obtain API Access:
1. Create an app on facebook developer portal to access the Graph API.
2. Add facebook login for authentication.
3. Add `users_posts` to use cases in order to access user’s posts.
4. Store App ID and App secret.

### Create React Dashboard Application:
1. Set up a new React project.
2. Design and develop UI components for the user login, dashboard and post details including graphs to visualize post performance metrics.
   
### Implement Node.js Backend:
1. Create a Node.js server to handle API requests.
2. Use Facebook Graph API SDK to fetch post data.
3. Implement endpoints to fetch and store post data.

### Integrate Facebook API:
- Utilize Facebook Graph API to retrieve post metrics such as likes, comments, shares, etc.
- Handle authentication and access permissions securely.

### Display Post Performance Metrics:
- Populate dashboard UI with data fetched from Facebook API.
- Visualize post performance metrics using graphs and charts.

## Frontend Details
### Setup
- Initialize vite app.
- Install `react-router-dom` for routing.
- Install `react-redux` and `reduxjs/toolkit` for state management.
- Install `chart.js` and `react-chartjs-2` for graph visualization.

### Redux-store
- Create a slice for authorization state called `auth` to maintain a global state that stores authentication status and user.
- Create thunk functions for login and logout to handle the asynchronous nature of authentication operations.
- Use `createSlice` from `reduxjs/toolkit` to create auth slice.
- Add thunk functions as extra reducers.
- Export actions and reducers for usage over the application.
- Create redux store with `authSlice` reducers.
- Export the store for usage across the application.

### Components
- Create a router with a Root element to provide routing functionality.
- Create a navbar for Root. It is named `MainNavigation` for this project.
- Create child element `login` to facilitate login and user authentication.
- Create the `overview` element.
- Create `postList` element.
- Create the `PostPerformance` element.

### Dependencies
- `axios` for making API requests.
- `chart.js` and `react-chartjs-2` as framework addon for chart display.
- `react-redux` and `reduxjs/toolkit` for state management.
- `React-router-dom` for routing.

## Backend Details
### Setup
- Node.js is initialized as default setup.
- `Express`, `express-async-handler`, `cors`, `bycryptjs`, `cookie-parser`, `dotenv`, `jsonwebtoken`, `mongoose`, `passport`, `passport-jwt` and `passport-local` are installed.
- `.env` file is created to store environment variables.
- Process environment is configured using `dotenv`.
- App is initialized using `express`.
- App is connected to the database.
- Middlewares are initialized.
- Routes are provided.
- Server is started using `app.listen`.

### User
- User model is created.
- User controller provides logic for user related calls.
- User router is initiated with Router from express.

### Post
- Post model is created.
- Post controller provides logic for post related calls.
- Post router is initiated with Router from express.

### Passport
- Passport is a middleware that allows for numerous ways of authentication.
- Local strategy.
- Jwt strategy.

## Login credentials
- **username**: atuny0 **password**: atuny@1234
- **username**: hbingley **password**: hbingley@1234
- **username**: john **password**: john@1234
- **username**: jane **password**: jane@1234

---
