FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose admin frontend port
EXPOSE 3001

# Start development server
CMD ["npm", "start"]
