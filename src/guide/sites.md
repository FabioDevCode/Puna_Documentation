---
title: Gestion des sites
---

# Gestion des sites

Un site représente un domaine ou une application web depuis lequel des soumissions sont envoyées à Puna.

<img :src="$withBase('/img/2-site-list.png')" alt="Liste des sites">

## Créer un site

Renseigner un **nom** et un **domaine** (utilisé à titre indicatif). Un token JWT est généré automatiquement lors de la création.

## Vue d'un site

La vue d'un site affiche la liste de ses formulaires ainsi que des statistiques globales (nombre de soumissions, dernière entrée).

<img :src="$withBase('/img/3-site-show.png')" alt="Show d'un site">

## Token JWT du site

Le token JWT est généré automatiquement à la création du site. Il est chiffré en AES-CBC côté serveur et utilisé pour authentifier les appels API.

- Visible dans la vue **"API"** du site.
- Le token contient (chiffré) l'identifiant du site et son `control_code`.
- Pour l'utiliser dans vos requêtes, voir [Authentification API](../api/authentification.md).

## Supprimer un site

La suppression d'un site est **irréversible** et entraîne la suppression en cascade de tous ses formulaires et soumissions associées.
