
This is a simple GitHub client implemented using the GitHub GraphQL API.
This document will guide you through the steps for running the project.

## Setup

Edit the `.env` file located in the root of the project with the following details:
- `REACT_APP_GITHUB_TOKEN` needs to contain a valid Github Personal access token
- `PORT` can also be changed from the default value of 3000

## Deploy with Docker

Run the script `./build_and_deploy.sh` to deploy the app to [http://localhost:3000](http://localhost:3000).
This will build a docker image based on the Dockerfile inside the project,
and will install prerequisites in a container that will then run `npm start`. 
Note that Docker is required on the host machine and that port 3000
should be available. This was tested on macOS Mojave.

## Manual build

###### Courtesy of [Create React App](https://github.com/facebook/create-react-app) :

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Hot reloading is activated and linting errors are shown in the console.

## Development Libraries

The complete list of non-trivial libraries used:
 * [ReactJS](https://github.com/facebook/react) - used to build the user interface
 * [Redux](https://github.com/reduxjs/redux) - used to contain the state of the application, alongside [React Redux](https://github.com/reduxjs/react-redux)
 * [Apollo Client](https://github.com/apollographql/apollo-client) - used to fetch data from the GraphQL API
 * [Material UI](https://github.com/mui-org/material-ui) - components implementing Google's Material Design
 * [React Router](https://github.com/ReactTraining/react-router) - used for navigation
