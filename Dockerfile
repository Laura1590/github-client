# base image
FROM node:9.6.1

# set working directory
RUN mkdir /workspace/
WORKDIR /workspace/

# add `/workspace/node_modules/.bin` to $PATH
ENV PATH /workspace/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /workspace/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# start app
CMD ["npm", "start"]