# Use Node.js 20.5.1 base image
FROM node:20.5.1

# Set working directory
WORKDIR /app

RUN rm -rf /tmp/puppeteer_cache

RUN npm cache clean --force

# Copy package.json and package-lock.json (if available) and install dependencies
COPY package*.json ./
RUN npm install

# Install required dependencies for Puppeteer and other packages

RUN apt-get update && apt-get install -y \
libxfixes3 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
libxi6 libxtst6 libxrandr2 libasound2 libatk1.0-0 libcups2 \
libdbus-1-3 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libnss3 \
libxss1 libxshmfence1

RUN apt-get install -y libdrm2 libgbm1

# Install gopd package
RUN npm install gopd

# Copy the rest of your files
COPY . .

# Install Chrome for Puppeteer
RUN npx puppeteer browsers install chrome
# Expose port if necessary (update to your app's port)
EXPOSE 3000

# Command to start your app
CMD ["npm", "start"]