# Stage 1: Development
FROM node:20-alpine AS development


# Dépendances système pour canvas
#RUN apt-get update && apt-get install -y \ build-essential \libcairo2-dev \libpango1.0-dev \libjpeg-dev \libgif-dev \librsvg2-dev


RUN npm i -g pnpm
WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY --chown=node:node . .
RUN pnpm install
RUN pnpm prisma generate
USER node

# Stage 2: Build
FROM node:20-alpine AS build
RUN npm i -g pnpm
WORKDIR /usr/src/app
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN pnpm build
ENV NODE_ENV=production
RUN npx prisma generate && npx prisma db push

RUN pnpm install --prod --ignore-scripts \
    && npm rebuild bcrypt --build-from-source
USER node

# Stage 3: Production
FROM node:20-alpine AS production

RUN apk add --no-cache ffmpeg
RUN apk add --no-cache curl
# Définir le répertoire de travail de l'application
WORKDIR /usr/src/app

# Copier les dépendances et fichiers de build depuis le stage `build`
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/.env.delivery .env
# Définir la commande de lancement de l'application en production
CMD ["node", "dist/src/main.js"]