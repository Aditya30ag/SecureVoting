FROM node:20-alpine

# Install necessary system dependencies for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Expose backend port
EXPOSE 5000

# Start development server
CMD ["npm", "run", "dev"]
