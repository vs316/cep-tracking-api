# Stage 1: Build
FROM node:20-alpine AS development
WORKDIR /app
# Copy package files
COPY package*.json ./
COPY prisma ./prisma/
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install
RUN npx prisma generate
# Copy source code
COPY . .
#Set default environment variables
ARG APP_ENV=development
#Expose environment variables
ENV NODE_ENV=${APP_ENV}
# Build the application
RUN npm run build
# Stage 2: Production
FROM node:20-alpine AS production
ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}
WORKDIR /app
RUN apk add --no-cache curl netcat-openbsd
# Copy built application and necessary files
COPY --from=development /app/dist ./dist
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/wait-for-db.sh ./wait-for-db.sh
RUN npm config set registry https://registry.npmmirror.com/
# Make wait-for-db.sh executable
RUN chmod +x wait-for-db.sh
EXPOSE 3000
CMD ["./wait-for-db.sh", "node", "dist/main"]