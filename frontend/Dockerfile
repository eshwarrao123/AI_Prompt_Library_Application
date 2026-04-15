FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose Angular default port
EXPOSE 4200

# Start Angular development server, exposing to all network interfaces
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
