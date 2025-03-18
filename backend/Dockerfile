# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy .env explicitly
COPY .env .env  

# Copy the rest of the backend files
COPY . .

# Expose backend port
EXPOSE 8000

# Start the server
CMD ["npm", "run", "dev"]
