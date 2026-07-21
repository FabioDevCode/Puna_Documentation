---
title: Introduction API
---

# Introduction API

Puna expose un **unique endpoint public** pour recevoir les soumissions de formulaires.

## Endpoint

```
POST /api/v1/send/:code
```

- `:code` correspond au code unique du **formulaire**, visible dans la vue "API" de chaque site.
- Deux formats de corps sont supportés : `application/json` et `multipart/form-data`.

## Authentification

Chaque appel requiert **3 éléments** cumulatifs :

1. **Header `X-KEY-PUNA`** - clé globale de l'application (variable `API_KEY` du `.env`)
2. **Header `Authorization: Bearer <token>`** - token JWT du site, disponible dans la vue "API"
3. **Code du formulaire dans l'URL**

Voir [Authentification](./authentification.md) pour le détail de chaque élément.

## Réponse

| Résultat | Corps de réponse                       |
| -------- | -------------------------------------- |
| Succès   | `{ "success": true }`                  |
| Erreur   | `{ "success": false, "error": "..." }` |

## Sections de cette documentation

| Page                                            | Description                                         |
| ----------------------------------------------- | --------------------------------------------------- |
| [Authentification](./authentification.md)       | Détail des 3 couches d'authentification             |
| [Endpoint](./endpoints.md)                      | Pipeline de traitement et codes de réponse complets |
| [Format des données](./format-donnees.md)       | Exemples JSON et multipart/form-data                |
| [Codes d'erreur](./codes-erreur.md)             | Récapitulatif et bonnes pratiques                   |
| [Exemples JavaScript](./exemples/javascript.md) | fetch (Node.js)                                     |
| [Exemples PHP](./exemples/php.md)               | cURL                                                |
| [Exemples Python](./exemples/python.md)         | requests                                            |

::: warning Appel depuis un backend uniquement
Ne jamais appeler l'API directement depuis le navigateur. Les secrets (`API_KEY`, token JWT) doivent rester côté serveur.
:::
