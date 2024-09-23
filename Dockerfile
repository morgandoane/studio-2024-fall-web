# Step 1: Build the application
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve the application with a lightweight static file server
FROM node:18-alpine

# Install `serve` to serve the static files
RUN npm install -g serve

# Copy built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Set the working directory to the build folder
WORKDIR /app/dist

# Expose port 8080 (for Cloud Run)
EXPOSE 8080

# Start the server
CMD ["serve", "-s", ".", "-l", "8080"]
