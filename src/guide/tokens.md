# Tokens API

Les **tokens JWT** sont nécessaires pour authentifier les requêtes vers l'API Puna. Chaque site possède ses propres tokens.

## Fonctionnement

Un token JWT Puna est :

- **Signé** avec la clé secrète `KEY_TK` du serveur
- **Chiffré en AES** — le payload contient les identifiants du site chiffrés
- **Lié au site** — un token est valide uniquement pour le site qui l'a généré

## Générer un Token

1. Accédez au détail de votre site
2. Cliquez sur **"Token"** (`/site/:id/token`)
3. Le token JWT est affiché
4. **Copiez-le** et conservez-le en lieu sûr

::: warning Important
Le token est affiché **une seule fois**. Assurez-vous de le copier immédiatement. Si vous le perdez, vous pouvez en générer un nouveau, mais les anciens restent valides tant qu'ils ne sont pas révoqués.
:::

## Utiliser le Token

Le token doit être inclus dans chaque requête API via le header `Authorization` :

```http
POST /api/v1/send/VOTRE_CODE HTTP/1.1
Host: votre-puna.com
X-KEY-PUNA: puna
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
    "nom": "Jean Dupont",
    "email": "jean@exemple.fr",
    "message": "Bonjour !"
}
```

## Révoquer les tokens

Si un token est **compromis** ou que vous souhaitez invalider tous les tokens existants d'un site :

1. Accédez au détail du site
2. Cliquez sur **"Révoquer les tokens"** (`PUT /site/:id/revoke-tokens`)
3. Un nouveau **`control_code`** est généré pour le site
4. **Tous les anciens tokens deviennent immédiatement invalides**

::: danger Attention
La révocation est **globale** : tous les tokens du site sont invalidés. Vous devrez générer un nouveau token et mettre à jour l'intégration sur votre site web.
:::

## Résumé

| Action   | Route                         | Description                              |
| -------- | ----------------------------- | ---------------------------------------- |
| Générer  | GET `/site/:id/token`         | Génère un nouveau token JWT pour le site |
| Révoquer | PUT `/site/:id/revoke-tokens` | Invalide tous les tokens du site         |

## Bonnes pratiques

- **Ne partagez jamais** un token publiquement (dépôt Git, code source frontal exposé, etc.)
- **Révoquez immédiatement** un token si vous suspectez une fuite
- Utilisez des **variables d'environnement** pour stocker vos tokens côté serveur
- Si vous intégrez depuis un frontend, envisagez un **proxy backend** pour masquer le token
