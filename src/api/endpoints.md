---
title: Endpoint
---

# Endpoint

## `POST /api/v1/send/:code`

Endpoint unique pour recevoir les soumissions de formulaires. Voir [Authentification](./authentification.md) pour les headers requis.

## Pipeline de traitement

Les middlewares sont exécutés dans l'ordre suivant :

| Étape | Middleware            | Rôle                                                                |
| ----- | --------------------- | ------------------------------------------------------------------- |
| 1     | `authApiKeyAccess`    | Vérifie `X-KEY-PUNA`, le token JWT et le code du formulaire         |
| 2     | `formRateLimiter`     | Rate limiting par IP (voir [codes d'erreur](./codes-erreur.md))     |
| 3     | `multipartUpload`     | Parse le body JSON ou multipart, avec gestion des fichiers          |
| 4     | `validateUpload`      | Valide les types MIME et extensions des fichiers                    |
| 5     | `inspectArchive`      | Inspecte le contenu des archives (ZIP bomb, macros, path traversal) |
| 6     | `scanUpload`          | Scan ClamAV (si `CLAMAV_ENABLED=true`)                              |
| 7     | `moveFilesToUploads`  | Déplace les fichiers vers `storage/uploads/`                        |
| 8     | `updateFormFileKeys`  | Met à jour les références de fichiers dans le body                  |
| 9     | `sanitizeRequestBody` | Sanitise le contenu contre les injections XSS                       |
| 10    | `updateFormTemplate`  | Met à jour le template de colonnes du formulaire si nécessaire      |
| 11    | `sendHandler`         | Persiste la soumission en base de données                           |

## Codes de réponse

| Code | Corps                                  | Cause                                 |
| ---- | -------------------------------------- | ------------------------------------- |
| 200  | `{ "success": true }`                  | Soumission enregistrée                |
| 400  | `{ "success": false, "error": "..." }` | Fichier invalide, body manquant…      |
| 401  | `{ "error": "Invalid API key" }`       | Clé `X-KEY-PUNA` incorrecte           |
| 401  | `{ "error": "Missing Bearer token" }`  | Token absent ou mal formaté           |
| 401  | `{ "error": "Invalid token" }`         | Token JWT invalide ou expiré          |
| 403  | `{ "error": "Site not found" }`        | Site introuvable ou `control_code` KO |
| 404  | `{ "error": "Form not found" }`        | Code formulaire inconnu               |
| 429  | _(rate limit)_                         | Trop de requêtes                      |
| 500  | `{ "success": false, "error": "..." }` | Erreur interne                        |
