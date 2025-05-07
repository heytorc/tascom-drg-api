# ======= Build Step
FROM node:23-alpine as builder

WORKDIR /app

COPY --chown=node . .

COPY ./package.json .
COPY ./tsconfig.json .

RUN yarn install
RUN yarn build

# ======= Deploy Step
FROM node:23-alpine as deploy
LABEL version="1.0.0"
LABEL maintainer="Heytor Cavalcanti <heytor.cavalcanti@tascomtecnologia.com.br>"
LABEL description="API Portal Portal DRG"

# ====== Environment Configs
ENV TZ=America/Sao_Paulo

# ====== Work Directory
WORKDIR /app

USER root

# ====== NodeJs & Prisma Dependencies
RUN apk add --no-cache \
    curl \
    unzip \
    tzdata \
    openssl \
    libc6-compat \
    python3 \
    make \
    g++ \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && ln -sf python3 /usr/bin/python \
    && apk del tzdata \
    && rm -rf /var/cache/apk/*

# ====== Install Monitor Packages
RUN npm install -g pm2

# ====== Install Application Packages
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./prisma ./prisma
COPY ./tsconfig.json ./

RUN yarn install
RUN yarn add prisma

# ====== Prisma Generate
RUN yarn add @prisma/client
RUN yarn prisma generate

# ====== Copy Build Application
COPY --from=builder --chown=node:node /app/build /app/src
RUN mkdir -p /app/src
RUN chmod -R 777 /app
RUN chown -R node:node /app

EXPOSE 4001

# ENTRYPOINT [ "./startup.sh" ]
# CMD ["pm2-runtime", "start", "/app/process.json"]
CMD ["node", "/app/src/server.js"]
