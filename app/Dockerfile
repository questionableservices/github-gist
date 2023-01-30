FROM node:18.13-alpine as builder
# Set the working directory to /app inside the container
WORKDIR ./app
# Copy app files
COPY .. .
# Set legacy dependencies so that atlassian design kit works with latest version of react
RUN npm config set legacy-peer-deps true
RUN npm i
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Start nginx
CMD ["nginx", "-g", "daemon off;"]