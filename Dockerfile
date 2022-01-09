FROM node:14-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

FROM node:14-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=true
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]