FROM node:22-alpine as dev

# Define working directory in container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy files from local directory to container
COPY . .
