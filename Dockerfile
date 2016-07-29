# Set the base image to Ubuntu
FROM ubuntu:wily

# File Author / Maintainer
MAINTAINER Dan VanWinkle <dan.vanwinkle@krush.com>

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
    apt-get -y install python build-essential nodejs

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install && mkdir -p /src && cp -a /tmp/node_modules /src/

# Define working directory
WORKDIR /src
ADD . /src

# Expose port
EXPOSE  8080

CMD [ "npm", "start" ]
