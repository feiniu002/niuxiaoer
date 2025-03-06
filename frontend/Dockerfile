# 构建阶段 - 使用具体版本号
FROM node:18.17.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
# 使用淘宝 npm 镜像
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm install
COPY . .
RUN npm run build

# 生产阶段 - 同样使用具体版本号
FROM node:18.17.0-alpine
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"] 