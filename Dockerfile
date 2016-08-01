# Set the base image to Ubuntu
FROM ubuntu:wily

# File Author / Maintainer
MAINTAINER Dan VanWinkle <dan.vanwinkle@krush.com>

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_4.x | bash - && \
    apt-get -y install nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

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
