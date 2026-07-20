---
title: Prérequis
---

# Prérequis

## Dépendances obligatoires

| Outil   | Version min | Rôle                        |
| ------- | ----------- | --------------------------- |
| Node.js | ≥ 24        | Serveur applicatif          |
| npm     | ≥ 10        | Gestionnaire de dépendances |
| MariaDB | ≥ 11        | Base de données             |

## Services optionnels

| Service | Rôle                                                                | Variables clés                                                  |
| ------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| SMTP    | Réinitialisation de mot de passe, email de bienvenue                | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` |
| ClamAV  | Scan antivirus des fichiers uploadés (socket Unix ou TCP port 3310) | `CLAMAV_ENABLED=true`, `CLAMAV_HOST`, `CLAMAV_PORT`             |

Sans SMTP, la réinitialisation de mot de passe est silencieusement désactivée. Sans ClamAV, les fichiers sont acceptés sans scan antivirus. Voir [Configuration](./configuration.md) pour le détail de toutes les variables d'environnement.
