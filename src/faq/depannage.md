---
title: Dépannage
---

# Dépannage — Erreurs courantes

## Démarrage de l'application

**`❌ Configuration Error: Missing required environment variables`**

Une ou plusieurs variables obligatoires manquent dans le `.env`. Vérifier le fichier `.env` en s'appuyant sur la [référence de configuration](../demarrage/configuration.md). Relancer `npm run setup` pour régénérer le fichier de manière interactive.

---

**L'application ne démarre pas — erreur de connexion à la base de données**

1. Vérifier que MariaDB est démarré et accessible.
2. Contrôler les variables `DB_IP`, `DB_PORT`, `DB_USER`, `DB_PWD` et `DB_NAME` dans le `.env`.
3. En environnement Docker : attendre que le healthcheck du service `db` soit `healthy` avant que le service `app` tente de démarrer.

---

**ClamAV reste en attente au démarrage**

C'est un comportement normal lors du **premier lancement** : ClamAV télécharge sa base de signatures (environ 90 secondes). Le healthcheck Docker est configuré avec `start_period: 90s`. Patienter jusqu'à ce que le service passe à l'état `healthy`.

## Erreurs API

**`401 Invalid API key`**

Vérifier que le header `X-KEY-PUNA` correspond exactement à la valeur de la variable `API_KEY` dans le `.env` (sensible à la casse, sans espaces).

---

**`401 Invalid token`**

Le token JWT est expiré ou a été mal copié. Régénérer le token depuis la vue **"API"** du site concerné (voir [Gestion des sites](../guide/sites.md)).

---

**`403 Site not found`**

Le token JWT ne correspond pas au site associé au formulaire appelé, ou le `control_code` est invalide. Vérifier que le bon token est utilisé pour le bon site.

---

**`404 Form not found`**

Le code formulaire dans l'URL est incorrect ou le formulaire a été supprimé. Vérifier le code dans la vue "API" du site.

## Fichiers et stockage

**Les fichiers uploadés ne sont pas conservés après un redémarrage Docker**

Vérifier que le volume `puna_storage` est correctement monté sur `/app/storage` dans le `compose.yml`. Ne pas supprimer les volumes Docker entre les redémarrages.

## Authentification

**Le 2FA TOTP ne fonctionne pas**

1. Vérifier que `TOTP_ENABLED=true` dans le `.env`.
2. Synchroniser l'horloge du serveur (NTP) — le TOTP est sensible au décalage horaire.
3. Rescanner le QR code depuis le [Profil](../guide/profil.md) pour réinitialiser la clé secrète.
