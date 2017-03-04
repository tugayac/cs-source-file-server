# Get the small sized image 6.x LTS
FROM node:boron-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/public
WORKDIR /usr/src/app

# Copy compiled app source
COPY ./build/bundle.js /usr/src/app

# Expose the port that the app is running on
EXPOSE 8089

# Run app
CMD [ "node", "bundle.js" ]