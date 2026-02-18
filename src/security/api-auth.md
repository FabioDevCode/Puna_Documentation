# Authentification API

L'API Puna utilise un système d'authentification **triple couche** pour sécuriser les requêtes de soumission.

## Les 3 couches de vérification

### 1. Header `X-KEY-PUNA`

La première vérification est basique : chaque requête doit inclure le header `X-KEY-PUNA` avec la valeur `puna`.

```http
X-KEY-PUNA: puna
```

Ce header agit comme un **premier filtre** pour rejeter immédiatement les requêtes non légitimes.

### 2. Bearer Token (JWT chiffré AES)

Le token JWT transmis via le header `Authorization` est un token avancé :

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Processus de vérification :**

1. Le token JWT est **vérifié** avec la clé secrète `KEY_TK`
2. Le payload du token est **déchiffré en AES** (avec les clés `KEV` et `KIV`)
3. Le payload déchiffré contient `{id, control_code}` du site
4. Ces informations sont **vérifiées en base de données** pour s'assurer que le site existe et que le `control_code` correspond

```
JWT → Vérification signature → Déchiffrement AES → Vérification BDD
```

### 3. Code du formulaire

Le paramètre `:code` dans l'URL est vérifié pour s'assurer que le formulaire :

- **Existe** en base de données
- **Appartient au site** identifié par le token JWT

```
POST /api/v1/send/:code
                  ↑
        Vérifié contre le site du token
```

## Schéma complet de l'authentification

```
Requête entrante
    │
    ├──→ Header X-KEY-PUNA == "puna" ?
    │         ❌ → 403 Forbidden
    │         ✅ ↓
    ├──→ Token JWT valide ?
    │         ❌ → 401 Unauthorized
    │         ✅ ↓
    ├──→ Payload AES déchiffrable ?
    │         ❌ → 401 Unauthorized
    │         ✅ ↓
    ├──→ Site existe en BDD avec ce control_code ?
    │         ❌ → 401 Unauthorized
    │         ✅ ↓
    ├──→ Formulaire :code appartient à ce site ?
    │         ❌ → 404 Not Found
    │         ✅ ↓
    └──→ Suite du pipeline (rate limit, upload, etc.)
```

## Génération des tokens

Les tokens sont générés depuis le dashboard Puna :

1. Accédez au détail d'un site
2. Cliquez sur **"Token"**
3. Le token JWT est créé avec :
   - Les identifiants du site **chiffrés en AES** comme payload
   - La **signature JWT** avec la clé `KEY_TK`

## Révocation des tokens

La révocation fonctionne en **régénérant le `control_code`** du site :

1. L'ancien `control_code` est remplacé par un nouveau (16 caractères aléatoires)
2. Tous les tokens existants contiennent l'ancien `control_code` dans leur payload chiffré
3. La vérification en BDD échouera pour ces anciens tokens → **ils sont tous invalidés**

C'est un mécanisme de révocation **globale** : tous les tokens d'un site sont invalidés d'un coup.

## Sécurité du chiffrement

| Composant     | Technologie     | Description                  |
| ------------- | --------------- | ---------------------------- |
| Signature JWT | `jsonwebtoken`  | Clé secrète ≥ 32 caractères  |
| Chiffrement   | AES (crypto-js) | Clé AES ≥ 32 caractères      |
| Vecteur init. | IV (crypto-js)  | Vecteur d'initialisation AES |

## Événements audités

| Événement                    | Logger(s)   |
| ---------------------------- | ----------- |
| Soumission API réussie       | api         |
| Erreur API                   | api + error |
| Échec d'authentification API | api + audit |
| Fichier uploadé rejeté       | api + error |
