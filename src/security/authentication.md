# Authentification web

L'authentification dans Puna repose sur **Passport.js** avec une stratégie **locale** (login + mot de passe).

## Flux de première connexion

Lorsqu'un administrateur crée votre compte, celui-ci est en statut **`pending`** et ne possède pas de mot de passe.

1. Accédez à la page de première connexion (`/dp-first-connexion`)
2. Saisissez votre **login** (fourni par l'administrateur)
3. Définissez votre **mot de passe** (confirmation requise)
4. Votre compte passe en statut **`active`**
5. Vous êtes redirigé vers la page de connexion

::: tip
La première connexion est limitée à **3 tentatives par 15 minutes** pour prévenir les attaques par force brute.
:::

## Flux de connexion classique

1. Accédez à la page de connexion (`/dp-login`)
2. Saisissez votre **login** et votre **mot de passe**
3. Passport.js vérifie le mot de passe via **bcrypt** (avec 10 salt rounds)
4. Seuls les comptes avec le statut **`active`** peuvent se connecter
5. En cas de succès :
   - Les données de session sont enregistrées : `id`, `login`, `email`, `role`, `status`
   - La date de `last_connection` est mise à jour
   - Vous êtes redirigé vers `/dashboard`

## Déconnexion

1. La **session est détruite**
2. Le **cookie `puna`** est supprimé
3. Redirection vers la page de connexion

## Hashage des mots de passe

Les mots de passe sont hashés avec **bcrypt** :

- **10 salt rounds** par défaut
- Le mot de passe en clair n'est **jamais stocké** en base de données
- La comparaison se fait via `bcrypt.compare()`

## Sessions

Les sessions sont gérées par `express-session` et stockées en base de données (MariaDB) via `express-mysql-session`.

| Propriété  | Valeur                                      |
| ---------- | ------------------------------------------- |
| Cookie     | `puna`                                      |
| `httpOnly` | `true` (non accessible via JavaScript)      |
| `sameSite` | `lax`                                       |
| `secure`   | `true` en production (HTTPS requis)         |
| Durée      | 12 heures par défaut (`SESSION_MAX_AGE`)    |
| Rolling    | `false` (pas de renouvellement automatique) |

## Protection des routes

Deux guards protègent les routes du dashboard :

### `isConnected`

Vérifie que l'utilisateur est authentifié. Si non, redirige vers `/dp-login`.

### `isConnectDash`

Guard inverse : redirige vers `/dashboard` si l'utilisateur est **déjà connecté** (utilisé sur les pages login et première connexion).

## Rate limiting

| Endpoint                            | Tentatives max | Fenêtre    | Clé                        |
| ----------------------------------- | -------------- | ---------- | -------------------------- |
| `/dp-connect` (login)               | 5              | 15 minutes | `login:{ip}:{login}`       |
| `/dp-first-co` (première connexion) | 3              | 15 minutes | `first-login:{ip}:{login}` |

Après dépassement, vous recevrez un message d'erreur et devrez attendre l'expiration de la fenêtre de temps.

## Événements de sécurité audités

Tous les événements liés à l'authentification sont enregistrés dans le journal d'audit :

| Événement                  | Logger(s)   |
| -------------------------- | ----------- |
| Connexion réussie          | audit       |
| Tentative échouée          | audit       |
| Changement de mot de passe | audit       |
| Accès refusé               | app + audit |
