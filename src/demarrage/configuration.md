---
title: Configuration
---

# Référence des variables d'environnement

Le fichier `.env` se génère via `npm run setup` (script interactif). Ce document décrit toutes les variables disponibles.

## Variables obligatoires

| Variable         | Description                                     |
| ---------------- | ----------------------------------------------- |
| `DB_IP`          | Hôte de la base de données                      |
| `DB_PORT`        | Port (généralement `3306`)                      |
| `DB_USER`        | Nom d'utilisateur (**ne pas utiliser `root`**)  |
| `DB_PWD`         | Mot de passe de la base de données              |
| `DB_NAME`        | Nom de la base de données                       |
| `DB_DIALECT`     | `mariadb` (ou `mysql`, `postgres`, `sqlite`)    |
| `KEY_TK`         | Clé de signature JWT pour les tokens API        |
| `KEV`            | Clé AES (chiffrement des données sensibles)     |
| `KIV`            | Vecteur d'initialisation AES                    |
| `SESSION_SECRET` | Secret de session Express                       |
| `CSRF_SECRET`    | Secret de protection CSRF                       |
| `API_KEY`        | Clé d'API (`X-KEY-PUNA`) pour l'endpoint public |
| `PORT`           | Port d'écoute du serveur (ex. `3022`)           |
| `NODE_ENV`       | `development`, `production` ou `test`           |

## Variables optionnelles

| Variable                  | Défaut                  | Description                                               |
| ------------------------- | ----------------------- | --------------------------------------------------------- |
| `SESSION_MAX_AGE`         | `43200000` (12 h)       | Durée de session en millisecondes                         |
| `HELMET_STRICT_TRANSPORT` | `false`                 | Active HSTS (recommandé en production)                    |
| `APP_URL`                 | `http://localhost:3000` | URL publique de l'application                             |
| `ADMIN_LOGIN`             | _(vide)_                | Login du premier administrateur (requis au 1er démarrage) |
| `ADMIN_EMAIL`             | _(vide)_                | Email du premier administrateur (optionnel)               |
| `TOTP_ENABLED`            | `false`                 | Active la fonctionnalité 2FA TOTP globalement             |
| `TOTP_ISSUER`             | `Puna`                  | Nom affiché dans l'application d'authentification         |
| `MCP_ENABLED`             | `false`                 | Active le serveur MCP                                     |

## Variables SMTP

Toutes ces variables sont requises pour activer la fonctionnalité mail. Si l'une manque, la réinitialisation de mot de passe est silencieusement désactivée.

| Variable    | Exemple                      |
| ----------- | ---------------------------- |
| `SMTP_HOST` | `smtp.example.com`           |
| `SMTP_PORT` | `587`                        |
| `SMTP_USER` | `user@example.com`           |
| `SMTP_PASS` | `motdepasse`                 |
| `SMTP_FROM` | `Puna <noreply@example.com>` |

## Variables ClamAV

| Variable         | Exemple  | Description                         |
| ---------------- | -------- | ----------------------------------- |
| `CLAMAV_ENABLED` | `true`   | Active le scan antivirus            |
| `CLAMAV_HOST`    | `clamav` | Hôte ClamAV (nom du service Docker) |
| `CLAMAV_PORT`    | `3310`   | Port TCP de `clamd`                 |
