# Référence API

## Endpoint

```
POST /api/v1/send/:code
```

| Paramètre | Description                                        |
| --------- | -------------------------------------------------- |
| `:code`   | Le code unique du formulaire (ex : `ABC123DEF456`) |

## Authentification

L'API utilise un système d'authentification **triple couche** :

### 1. Header `X-KEY-PUNA`

Chaque requête doit inclure le header suivant :

```http
X-KEY-PUNA: puna
```

### 2. Bearer Token (JWT)

Un token JWT doit être transmis via le header `Authorization` :

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Ce token est :

- **Signé** avec la clé secrète du serveur
- **Chiffré en AES** — le payload contient les identifiants du site chiffrés
- **Vérifié en base de données** pour s'assurer de la validité

Pour obtenir un token, consultez [Tokens API](../guide/tokens.md).

### 3. Code formulaire

Le paramètre `:code` dans l'URL est vérifié pour s'assurer qu'il correspond à un formulaire **du site authentifié** par le token JWT.

## Types de contenu acceptés

| Content-Type          | Usage                        |
| --------------------- | ---------------------------- |
| `application/json`    | Données JSON (sans fichiers) |
| `multipart/form-data` | Données avec fichiers joints |

## Headers de requête

| Header          | Obligatoire | Valeur                                      |
| --------------- | ----------- | ------------------------------------------- |
| `X-KEY-PUNA`    | ✅          | `puna`                                      |
| `Authorization` | ✅          | `Bearer <token_jwt>`                        |
| `Content-Type`  | ✅          | `application/json` ou `multipart/form-data` |

## Requête JSON

```http
POST /api/v1/send/ABC123DEF456 HTTP/1.1
Host: votre-puna.com
X-KEY-PUNA: puna
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
    "nom": "Jean Dupont",
    "email": "jean@exemple.fr",
    "message": "Bonjour, je souhaite un devis."
}
```

## Requête multipart (avec fichiers)

```http
POST /api/v1/send/ABC123DEF456 HTTP/1.1
Host: votre-puna.com
X-KEY-PUNA: puna
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: multipart/form-data; boundary=----FormBoundary

------FormBoundary
Content-Disposition: form-data; name="nom"

Jean Dupont
------FormBoundary
Content-Disposition: form-data; name="document"; filename="cv.pdf"
Content-Type: application/pdf

(contenu binaire)
------FormBoundary--
```

## Réponse en cas de succès

```json
{
  "success": true
}
```

**Code HTTP** : `200 OK`

## Réponses d'erreur

| Code HTTP | Signification         | Cause probable                                 |
| --------- | --------------------- | ---------------------------------------------- |
| `400`     | Bad Request           | Données manquantes ou invalides                |
| `401`     | Unauthorized          | Token JWT manquant, expiré ou invalide         |
| `403`     | Forbidden             | Header `X-KEY-PUNA` manquant ou incorrect      |
| `404`     | Not Found             | Code formulaire inconnu                        |
| `429`     | Too Many Requests     | Rate limit dépassé (30 req/min par formulaire) |
| `500`     | Internal Server Error | Erreur serveur interne                         |

## Pipeline de traitement

Chaque requête traverse **9 middlewares** dans l'ordre :

| #   | Middleware            | Description                                              |
| --- | --------------------- | -------------------------------------------------------- |
| 1   | `authApiKeyAccess`    | Authentification triple (header + JWT + code)            |
| 2   | `formRateLimiter`     | Rate limiting (30 req/min par formulaire)                |
| 3   | `multipartUpload`     | Parsing multipart (multer) + limites                     |
| 4   | `validateUpload`      | Validation des fichiers (extensions + magic bytes)       |
| 5   | `inspectArchive`      | Analyse sécurisée des archives (ZIP bombs, macros, etc.) |
| 6   | `moveFilesToUploads`  | Déplacement des fichiers vers le stockage définitif      |
| 7   | `updateFormFileKeys`  | Mémorisation des champs fichiers dans le formulaire      |
| 8   | `sanitizeRequestBody` | Nettoyage XSS du body                                    |
| 9   | `updateFormTemplate`  | Auto-apprentissage du schéma du formulaire               |
| →   | `sendHandler`         | Sauvegarde en base de données (Inbox)                    |
