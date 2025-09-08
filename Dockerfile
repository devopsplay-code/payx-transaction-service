# Use official Node.js runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose the service port
EXPOSE 4003
# Start the app
CMD ["npm", "start"]
