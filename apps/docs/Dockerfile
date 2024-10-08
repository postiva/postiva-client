FROM node:22 as base
RUN npm install -g pnpm

FROM base AS pruner
WORKDIR /app
RUN npm install turbo@1.11.3 -g
COPY . .
RUN turbo prune --scope=@postiva/docs --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN export COREPACK_ENABLE_STRICT=0 && pnpm install

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
RUN export COREPACK_ENABLE_STRICT=0 && pnpm docs:build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
EXPOSE 3000
CMD export COREPACK_ENABLE_STRICT=0 && pnpm docs:start