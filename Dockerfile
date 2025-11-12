# ---------- Stage 1: Build Vue (Vite) ----------
FROM node:20-alpine AS build
WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build production
RUN npm run build && npm cache clean --force

# ---------- Stage 2: Serve bằng Nginx ----------
FROM nginx:alpine

# Copy dist từ stage build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy cấu hình nginx tuỳ chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
