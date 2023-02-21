# Stage 1: Build the TypeScript app in development mode
FROM node:18.14.1-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build the app in staging mode
FROM node:18.14.1-alpine AS staging
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 3: Build the app in production mode
FROM node:18.14.1-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Set the final image
FROM node:18.14.1-alpine AS final
WORKDIR /app
COPY --from=development /app/dist ./dist
COPY --from=staging /app/dist ./dist-staging
COPY --from=production /app/dist ./dist-production

CMD ["node", "dist/index.js"]
