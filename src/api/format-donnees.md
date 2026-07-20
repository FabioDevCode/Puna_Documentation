---
title: Format des données
---

# Format des données

L'endpoint `POST /api/v1/send/:code` accepte deux formats de corps. Dans les deux cas, les headers d'[authentification](./authentification.md) sont obligatoires.

## JSON

```http
POST /api/v1/send/contact_acme_corp
Content-Type: application/json
X-KEY-PUNA: gk_prod_7f3a2b9c
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "nom": "Alice Martin",
  "email": "alice@example.com",
  "message": "Bonjour, je souhaite obtenir un devis."
}
```

Toutes les clés de premier niveau sont acceptées. Les valeurs sont sanitisées contre le XSS avant stockage.

- `X-KEY-PUNA` : valeur de la variable `API_KEY` dans le `.env` — voir [Configuration](../demarrage/configuration.md)
- `Authorization` : token JWT du site — voir la vue "API" du site dans [Gestion des sites](../guide/sites.md)
- `contact_acme_corp` : code du formulaire — voir la vue "API" du site dans [Gestion des formulaires](../guide/formulaires.md)

## Multipart / Form-data

```http
POST /api/v1/send/contact_acme_corp
Content-Type: multipart/form-data
X-KEY-PUNA: gk_prod_7f3a2b9c
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

nom=Alice Martin
email=alice@example.com
fichier=<binary>
```

### Fichiers joints

- Stockés dans `storage/uploads/` et référencés dans la soumission.
- **12 types MIME acceptés par défaut** : images (JPEG, PNG, GIF, WebP), PDF, archives (ZIP, RAR, 7z), documents Office (DOCX, XLSX, PPTX) et texte plat.
- Chaque fichier est validé par extension **et** par magic bytes.
- Les archives sont inspectées (protection contre les ZIP bombs, macros VBA, exécutables intégrés, path traversal).
- Si ClamAV est activé, chaque fichier est scanné avant stockage — un fichier infecté est rejeté avec une réponse `400`.

Pour des exemples complets dans votre langage, voir :

- [JavaScript (Node.js)](./exemples/javascript.md)
- [PHP (cURL)](./exemples/php.md)
- [Python (requests)](./exemples/python.md)
