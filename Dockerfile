# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy your Prisma schema and generate the Prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run build
RUN apt-get update && apt-get install -y default-mysql-client

# Stage 2: Run the application
FROM node:18 AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
