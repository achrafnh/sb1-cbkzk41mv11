# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Create .env file from example if it doesn't exist
COPY .env.example .env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]