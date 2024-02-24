FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm i --omit=dev
RUN npm install pm2 -g
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/ecosystem.config.js .
EXPOSE 4000

CMD ["pm2-runtime", "dist/main.js"]