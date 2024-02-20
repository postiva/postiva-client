FROM node:alpine as builder
RUN apk update
RUN npm install -g pnpm

WORKDIR /app

RUN npm install turbo -g

COPY . .

RUN pnpm install
RUN turbo prune --scope=@postiva/docs --docker
RUN pnpm docs:build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app  .

EXPOSE 5000

CMD pnpm docs:preview