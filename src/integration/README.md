# Intégration

Cette section vous guide dans l'intégration de Puna sur vos sites web. Vous y trouverez la **référence complète de l'API**, des **exemples de code** et les **bonnes pratiques** pour une intégration réussie.

## Prérequis

Avant d'intégrer Puna, assurez-vous d'avoir :

1. ✅ **Créé un site** dans le dashboard Puna ([voir guide](../guide/sites.md))
2. ✅ **Créé un formulaire** rattaché à ce site ([voir guide](../guide/forms.md))
3. ✅ **Généré un token JWT** pour le site ([voir guide](../guide/tokens.md))

## Principe de fonctionnement

L'intégration se résume à envoyer une requête HTTP `POST` depuis votre site web vers l'API Puna :

```
Votre site web  ──→  POST /api/v1/send/:code  ──→  Puna (inbox)
```

Chaque requête doit inclure :

- Le **header `X-KEY-PUNA`** avec la valeur `puna`
- Le **token JWT** dans le header `Authorization: Bearer ...`
- Les **données** du formulaire (JSON ou FormData)

## Sommaire

| Page                                        | Description                                    |
| ------------------------------------------- | ---------------------------------------------- |
| [Référence API](./api-reference.md)         | Endpoint, authentification, headers, réponses  |
| [Formulaire HTML](./html-form.md)           | Intégration avec un formulaire HTML classique  |
| [JavaScript (fetch)](./javascript-fetch.md) | Intégration avec JavaScript (fetch / axios)    |
| [Upload de fichiers](./file-upload.md)      | Types acceptés, limites, validation            |
| [Rate limiting](./rate-limiting.md)         | Limites de requêtes et gestion des erreurs 429 |

## Exemple rapide

```javascript
const response = await fetch("https://votre-puna.com/api/v1/send/VOTRE_CODE", {
  method: "POST",
  headers: {
    "X-KEY-PUNA": "puna",
    Authorization: "Bearer VOTRE_TOKEN_JWT",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nom: "Jean Dupont",
    email: "jean@exemple.fr",
    message: "Bonjour !",
  }),
});

const result = await response.json();
// { success: true }
```
