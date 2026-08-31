---
title: Gestion des formulaires
---

# Gestion des formulaires

Un formulaire est rattaché à un [site](./sites.md). Chaque formulaire possède un code unique utilisé dans l'URL de l'API.

## Créer un formulaire

Renseigner un **nom** et une **description** (facultative). Le formulaire est automatiquement rattaché au site courant.

<img :src="$withBase('/img/3-site-show.png')" alt="Show d'un site">

## Code du formulaire

Le code du formulaire est l'identifiant unique utilisé dans l'URL d'envoi de l'API :

```
POST /api/v1/send/:code
```

Il est visible dans la vue **"API"** du site. Pour l'utiliser, voir [Endpoint](../api/endpoints.md).

## Template de colonnes

Puna détecte automatiquement les colonnes à partir de la **première soumission reçue** et les stocke dans `form.template`.

Les soumissions suivantes sont normalisées par rapport à ce template, garantissant une structure cohérente dans l'affichage et les exports.

## Supprimer un formulaire

La suppression d'un formulaire est **irréversible** et entraîne la suppression en cascade de toutes ses soumissions.
