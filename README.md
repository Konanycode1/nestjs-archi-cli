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

my-app/
├─ src/
│  ├─ common/
│  │  ├─ auth/
│  │  ├─ http/
│  │  ├─ logger/
│  │  └─ notification/
│  ├─ config/
│  ├─ features/
│  │  ├─ kafka/
│  │  └─ user/
│  ├─ utils/
│  ├─ app.module.ts
│  └─ main.ts
├─ prisma/
├─ docker-compose-dev.yml
├─ docker-compose-prod.yml
├─ Dockerfile
├─ tsconfig.json
└─ package.json



