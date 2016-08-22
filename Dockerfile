# Set the base image to Ubuntu
FROM node:6.4.0

# File Author / Maintainer
MAINTAINER Dan VanWinkle <dan.vanwinkle@krush.com>

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && \
    npm install && \
    mkdir -p /src&& \
    cp -a /tmp/node_modules /src/ && \
    cp /tmp/package.json /src && \
    rm -rf /tmp/*

# Define working directory
WORKDIR /src
ADD ./src /src

# Expose port
EXPOSE  8080

CMD [ "npm", "start" ]
