---
title: Installation (production)
---

# Installation (production / Docker)

**Image officielle** : `fabiodevcode/puna`

## Télécharger les fichiers de démarrage

```bash
curl -fsSLO https://fabiodevcode.github.io/Puna/compose.yml
curl -fsSLO https://fabiodevcode.github.io/Puna/scripts/setup.sh
```

## Configurer et démarrer

```bash
bash setup.sh         # configure le fichier .env
docker compose up -d  # démarre Puna, MariaDB et ClamAV
```

## Services inclus dans `compose.yml`

| Service  | Image                  | Rôle                                   |
| -------- | ---------------------- | -------------------------------------- |
| `app`    | `fabiodevcode/puna`    | Serveur Puna (port 3022 sur localhost) |
| `db`     | `mariadb:11.4`         | Base de données MariaDB                |
| `clamav` | `clamav/clamav:latest` | Scan antivirus (port TCP 3310 interne) |

## Volumes persistants

Les volumes suivants sont créés automatiquement :

| Volume             | Chemin dans le conteneur | Contenu                   |
| ------------------ | ------------------------ | ------------------------- |
| `puna_storage`     | `/app/storage`           | Fichiers uploadés         |
| `puna_logs`        | `/app/logs`              | Journaux applicatifs      |
| `puna_db_data`     | _(MariaDB interne)_      | Données MariaDB           |
| `puna_clamav_data` | _(ClamAV interne)_       | Base de signatures ClamAV |

## Notes de production

- Le port 3022 est exposé uniquement sur `127.0.0.1` - prévoir un reverse proxy (nginx, Caddy…).
- ClamAV peut prendre environ 90 secondes au premier démarrage (téléchargement des signatures). Le healthcheck est configuré avec `start_period: 90s`.
- ClamAV accède au stockage Puna en lecture seule via un volume partagé.

Voir [Configuration](./configuration.md) pour le détail de toutes les variables d'environnement.
