# Need to specify the base image that the vue.js app will be running on.
# The following comes from: https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html?redirect=true
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Install axios. Its globally installed in the parent directory but we need to install it here
RUN npm install axios

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]