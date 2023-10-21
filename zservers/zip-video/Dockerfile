# Use the official Node.js LTS Alpine image as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Install FFmpeg
RUN apk --no-cache add ffmpeg

# Copy only the package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install "sharp" module with ARM/M1 compatibility
RUN npm install --arch=arm64 --platform=linuxmusl sharp

# Copy the rest of your application files to the container
COPY . .

# Expose the port your application listens on (if necessary)
EXPOSE 8000

# Specify the command to run your Node.js application
CMD ["node", "index.js"]
