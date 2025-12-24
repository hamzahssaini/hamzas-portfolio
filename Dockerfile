# Use official Node LTS image
FROM node:18-alpine

WORKDIR /app

# Install dependencies first (package*.json)
COPY package*.json ./
RUN npm ci --only=production

# Copy app source (do not copy .env)
COPY . .

# Expose port (optional)
EXPOSE 3000 

# Use runtime env var PORT in your app (process.env.PORT)
CMD ["node", "app.js"]