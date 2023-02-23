# Stage 1: Build the TypeScript app in development mode
FROM node:18.14.1-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
