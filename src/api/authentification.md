---
title: Authentification
---

# Authentification

Chaque appel à l'API Puna requiert **3 éléments d'authentification cumulatifs**. L'absence de l'un d'eux provoque une erreur `401` ou `403`.

## 1. Header `X-KEY-PUNA`

Clé globale de l'application, définie par la variable `API_KEY` dans le [`.env`](../demarrage/configuration.md).

```http
X-KEY-PUNA: votre_cle_api_globale
```

La comparaison est effectuée à **temps constant** côté serveur pour se prémunir contre les attaques par timing.

## 2. Header `Authorization: Bearer <token>`

Token JWT du **site**, généré automatiquement lors de la création du site. Disponible dans la vue **"API"** de chaque site (voir [Gestion des sites](../guide/sites.md)).

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Le token contient, chiffré en AES-CBC, l'identifiant du site et son `control_code`. Ce token est à conserver **côté serveur uniquement**.

## 3. Code du formulaire dans l'URL

Le `:code` dans l'URL correspond au code unique du **formulaire**, visible dans la vue "API" du site (voir [Gestion des formulaires](../guide/formulaires.md)).

```http
POST /api/v1/send/mon_code_formulaire
```

## Récapitulatif

```http
POST /api/v1/send/mon_code_formulaire
X-KEY-PUNA: votre_cle_api_globale
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Pour des exemples complets d'appels API, voir [Format des données](./format-donnees.md) et les pages d'exemples par langage.
