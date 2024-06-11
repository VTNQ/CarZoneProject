# Use the official Node.js image as the parent image
FROM node:12

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install

# Build the app
RUN npm run build

# Make the app run on port 3000
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]