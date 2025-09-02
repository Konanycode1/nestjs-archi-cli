# NestJS Archi CLI
  

[![npm version](https://img.shields.io/npm/v/nestjs-archi-cli?color=blue)](https://www.npmjs.com/package/nestjs-archi-cli)
[![license](https://img.shields.io/npm/l/nestjs-archi-cli?color=green)](LICENSE)
[![build](https://img.shields.io/github/actions/workflow/status/Konanycode1/nestjs-archi-cli/build.yml?branch=main)](https://github.com/Konanycode1/nestjs-archi-cli/actions)

🚀 **NestJS Archi CLI** est un outil en ligne de commande pour générer rapidement un projet NestJS avec une **architecture prédéfinie et prête à l’emploi**.

Il permet de créer un boilerplate propre avec les dossiers, modules et services déjà organisés selon de bonnes pratiques.

---

---

## 🌟 Features

- Structure de dossier **pré-définie** (`src/modules`, `common`, `config`, `utils`, `features`, etc.)  
- Modules NestJS prêts à l’emploi : auth, user, kafka, notifications, utils, etc.  
- Fichiers TypeScript et configuration TS/Prisma inclus  
- Dockerfile et docker-compose pour dev et prod  
- Compatible avec **pnpm, npm ou yarn**  
- CLI simple : `npx nestjs-archi my-app`

---

## 💿 Installation

### Avec npx (recommandé)
```bash
npx nestjs-archi-cli my-app

cd my-app

pnpm install  # ou npm install / yarn install

pnpm run start:dev  # ou npm run start:dev

```

## 📁 Structure générée (exemple)

Lorsque vous créez un projet avec **NestJS Archi CLI**, la structure suivante sera générée :

```
nestjs-repos/
│  ├─ prisma/
│  │  └─ schema.prisma
│  ├─ src/
│  ├─ common/
│  │  ├─ auth/
│  │  │  ├─ dto/
│  │  │  │  ├─ create-auth.dto.ts
│  │  │  │  └─ update-auth.dto.ts
│  │  │  ├─ jwt/
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  ├─ constant.ts
│  │  │  │  ├─ jwt.guard.ts
│  │  │  │  └─ jwt.strategy.ts
│  │  │  ├─ role/
│  │  │  │  ├─ role.decorators.ts
│  │  │  │  ├─ role.enum.ts
│  │  │  │  └─ role.guard.ts
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  └─ auth.service.ts
│  │  ├─ http/
│  │  │  ├─ http-client.module.ts
│  │  │  └─ http-client.service.ts
│  │  ├─ logger/
│  │  │  ├─ error.logging.ts
│  │  │  └─ logging.interceptor.ts
│  │  └─ notification/
│  │     ├─ notification.module.ts
│  │     └─ notification.service.ts
│  ├─ config/
│  │  ├─ db.module.ts
│  │  ├─ db.ts
│  │  └─ env.validation.ts
│  ├─ features/
│  │  ├─ kafka/
│  │  │  ├─ kafka.consumer.controller.ts
│  │  │  ├─ kafka.consumer.service.ts
│  │  │  ├─ kafka.module.ts
│  │  │  └─ kafka.producer.service.ts
│  │  └─ user/
│  │     ├─ core/
│  │     │  ├─ dto/
│  │     │  │  ├─ create-user.dto.ts
│  │     │  │  └─ update-user.dto.ts
│  │     │  ├─ interface/
│  │     │  │  └─ user.repository.interface.ts
│  │     │  └─ use-case/
│  │     │     └─ user.service.ts
│  │     ├─ inBound/
│  │     │  └─ user.controller.ts
│  │     ├─ outBound/
│  │     │  └─ user.repository.ts
│  │     └─ user.module.ts
│  ├─ utils/
│  │  ├─ validators/
│  │  │  └─ phoneNumber.validate.ts
│  │  ├─ crypt.ts
│  │  ├─ generate.ts
│  │  ├─ logging.prisma.ts
│  │  ├─ validation-fields.ts
│  │  └─ validation-option.ts
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  └─ main.ts
├─ test/
│  ├─ app.e2e-spec.js
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ .dockerignore
├─ .env
├─ .env.example
├─ .env.production
├─ .gitignore
├─ .prettierrc
├─ aborescence.txt
├─ docker-compose-dev.yml
├─ docker-compose-prod.yml
├─ Dockerfile
├─ dockerfile.dev
├─ eslint.config.mjs
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tsconfig.build.json
├─ tsconfig.build.tsbuildinfo
└─ tsconfig.json


> Cette structure assure que le code est **modulaire, lisible et maintenable**, même pour des projets complexes avec plusieurs modules métier.


