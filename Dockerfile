# builder
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

ENV VITE_API_BASE_URL=https://abitus-api.geia.vip/v1

COPY . .
RUN npm run build

# runner
FROM nginx:alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
