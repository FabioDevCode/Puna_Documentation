# Sécurité

Puna intègre de **multiples couches de sécurité** pour protéger vos données et votre instance. Cette section détaille les mécanismes de protection en place.

## Vue d'ensemble

| Couche                   | Technologie          | Description                                                    |
| ------------------------ | -------------------- | -------------------------------------------------------------- |
| **Headers HTTP**         | Helmet.js            | CSP stricte, HSTS, X-Content-Type-Options, etc.                |
| **CSRF**                 | csrf-csrf            | Double Submit Cookie (pages web)                               |
| **XSS**                  | xss                  | Sanitization récursive de tous les inputs                      |
| **Authentification web** | Passport.js + bcrypt | Login/password avec hash bcrypt                                |
| **Authentification API** | JWT + AES            | Triple vérification (header + token chiffré + code formulaire) |
| **Rate limiting login**  | express-rate-limit   | 5 tentatives/15min                                             |
| **Rate limiting API**    | express-rate-limit   | 30 req/min par formulaire                                      |
| **Upload**               | multer + validation  | Extensions + magic bytes + inspection archives                 |
| **Archives**             | Analyse statique     | Anti ZIP bomb, anti macros VBA, anti exécutables               |
| **PDF**                  | Inspection contenu   | Rejet si contient JavaScript embarqué                          |
| **Sessions**             | MariaDB-backed       | Cookie httpOnly/secure/sameSite                                |
| **Chiffrement**          | AES (crypto-js)      | Payload JWT chiffré                                            |
| **Logging**              | Pino (audit.log)     | Événements de sécurité audités                                 |

## Validation de l'environnement

Au démarrage, le serveur vérifie automatiquement :

- La **présence** de toutes les variables d'environnement obligatoires
- Le **format** des ports (1-65535)
- La **longueur minimale** des clés de sécurité (32 caractères)
- Les **valeurs autorisées** pour `NODE_ENV` et `DB_DIALECT`
- La **détection des valeurs par défaut** non sécurisées

::: danger
Si une erreur critique est détectée lors de la validation, **le serveur s'arrête** (`process.exit(1)`) pour éviter tout démarrage non sécurisé.
:::

## En savoir plus

- [Authentification web](./authentication.md) — Login, sessions, mots de passe
- [Authentification API](./api-auth.md) — JWT, AES, triple vérification
- [Validation des fichiers](./file-validation.md) — Extensions, magic bytes, archives
- [Protections CSRF et XSS](./csrf-xss.md) — Protection des formulaires et des inputs
