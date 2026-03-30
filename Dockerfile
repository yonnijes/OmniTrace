# Stage 1: Base - Install dependencies
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm install

# Stage 2: Builder - Build the applications
FROM base AS builder
COPY . .
RUN npx nx build api --configuration=production
RUN npx nx build map-web --configuration=production

# Stage 3: API Runtime
FROM node:20-alpine AS api
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist/apps/api ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

EXPOSE 3333
CMD ["node", "dist/main.js"]

# Stage 4: Frontend Runtime (Nginx)
FROM nginx:alpine AS map-web
COPY --from=builder /app/dist/apps/map-web /usr/share/nginx/html
# Standard Nginx config for SPA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
