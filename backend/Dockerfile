# Use the latest Node.js 20 Alpine image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "run", "dev"]
