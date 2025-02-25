# Stage 1: Build the React app
FROM node:16 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the React app using Nginx
FROM nginx:stable-alpine AS production-stage

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage to Nginx's default serving directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]