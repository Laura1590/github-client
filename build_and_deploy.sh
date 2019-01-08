#!/bin/bash

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)

# Build a docker image which installs dependencies for deploying the 
# git-hub client
docker build -t git-hub-client "$script_dir"

# Get port from .env file
port=$(grep PORT .env | cut -d '=' -f2)

# Create a new container using the previously created image and
# mount the project folder onto it. The container will deploy 
# the app by running `npm run start`
docker run -i -t -v "$script_dir":/workspace -v /workspace/node_modules -p "$port":"$port" --rm git-hub-client
