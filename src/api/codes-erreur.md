---
title: Codes d'erreur & bonnes pratiques
---

# Codes d'erreur & bonnes pratiques

## Récapitulatif des codes HTTP

| Code | Corps                                  | Cause                                                |
| ---- | -------------------------------------- | ---------------------------------------------------- |
| 200  | `{ "success": true }`                  | Soumission enregistrée avec succès                   |
| 400  | `{ "success": false, "error": "..." }` | Fichier invalide, body manquant ou rejeté par ClamAV |
| 401  | `{ "error": "Invalid API key" }`       | Header `X-KEY-PUNA` incorrect                        |
| 401  | `{ "error": "Missing Bearer token" }`  | Token absent ou mal formaté dans `Authorization`     |
| 401  | `{ "error": "Invalid token" }`         | Token JWT invalide ou expiré                         |
| 403  | `{ "error": "Site not found" }`        | Site introuvable ou `control_code` invalide          |
| 404  | `{ "error": "Form not found" }`        | Code formulaire inconnu                              |
| 429  | _(rate limit headers)_                 | Trop de requêtes depuis cette IP                     |
| 500  | `{ "success": false, "error": "..." }` | Erreur interne du serveur                            |

## Bonnes pratiques

### Sécurité des credentials

- Ne **jamais** exposer `API_KEY` côté client — toujours appeler l'API depuis un backend.
- Stocker le token JWT du site côté serveur uniquement.
- Ne pas versionner le `.env` dans un dépôt public.

### Traitement des réponses

- Vérifier le code HTTP **avant** de traiter le corps de la réponse.
- En cas de `401`, vérifier la présence et l'exactitude des headers `X-KEY-PUNA` et `Authorization`.
- En cas de `403`, vérifier que le token JWT correspond bien au site dont le formulaire est appelé.

### Rate limiting (`429`)

- Ne pas réessayer immédiatement un `429` — attendre avant de retenter.
- Le rate limiting est appliqué **par IP** sur l'endpoint d'envoi.

### Tokens expirés

En cas de `401 Invalid token`, régénérer le token depuis la vue "API" du site (voir [Gestion des sites](../guide/sites.md)).
