# Use Node.js as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ./backend/package*.json ./
RUN npm install



# Copy the rest of the backend files
COPY ./backend .

# Expose backend port
EXPOSE 8000

# Start the server
CMD ["npm", "run", "dev"]
