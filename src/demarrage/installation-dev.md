---
title: Installation (développeur)
---

# Installation (développeur)

## Prérequis

Vérifier que Node.js ≥ 24, npm ≥ 10 et MariaDB ≥ 11 sont installés. Voir [Prérequis](./prerequis.md).

## Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/FabioDevCode/Puna.git
cd Puna

# 2. Générer le fichier .env (script interactif, aucune dépendance requise)
npm run setup

# 3. Installer les dépendances
npm install

# 4. Démarrer en mode développement (rechargement automatique)
npm run dev
```

Le serveur démarre sur `http://localhost:3022` (ou le port configuré dans `.env`).

Le compte administrateur initial est créé via `ADMIN_LOGIN` dans le `.env`. Voir [Configuration](./configuration.md) pour le détail de cette variable.

`npm run setup` est un script interactif qui génère le fichier `.env` complet sans aucune dépendance npm préalable.

## Avec Docker (développeur)

```bash
npm run setup   # sélectionner le mode Docker quand demandé
docker compose up -d
```
