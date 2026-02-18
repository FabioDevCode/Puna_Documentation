# Protections CSRF et XSS

Puna intègre des protections contre les attaques **CSRF** (Cross-Site Request Forgery) et **XSS** (Cross-Site Scripting).

## Protection CSRF

### Qu'est-ce que le CSRF ?

Une attaque CSRF consiste à faire exécuter des actions non désirées par un utilisateur authentifié, en exploitant sa session active.

### Mécanisme : Double Submit Cookie

Puna utilise le pattern **Double Submit Cookie** via la librairie `csrf-csrf` :

1. Un **token CSRF** est généré et stocké dans un cookie
2. Le même token doit être envoyé dans le **corps de la requête** ou un **header**
3. Le serveur vérifie que les deux valeurs correspondent

### Périmètre

| Contexte                  | CSRF activé                                |
| ------------------------- | ------------------------------------------ |
| **Pages web (dashboard)** | ✅ Oui                                     |
| **API REST**              | ❌ Non (authentification par Bearer token) |

::: tip Pourquoi pas de CSRF sur l'API ?
L'API utilise une authentification par **Bearer token** (header `Authorization`). Ce type d'authentification n'est pas vulnérable aux attaques CSRF classiques car le token n'est pas envoyé automatiquement par le navigateur, contrairement aux cookies de session.
:::

## Protection XSS

### Qu'est-ce que le XSS ?

Une attaque XSS consiste à injecter du code malveillant (JavaScript) dans une page web pour voler des données ou effectuer des actions au nom de l'utilisateur.

### Sanitization globale

Puna applique une **sanitization récursive** sur tous les inputs :

- **Body** (corps de la requête)
- **Query** (paramètres d'URL)
- **Params** (paramètres de route)

La librairie `xss` est utilisée pour nettoyer automatiquement tout contenu potentiellement dangereux :

```
<script>alert('xss')</script>  →  &lt;script&gt;alert('xss')&lt;/script&gt;
```

### Sanitization API

Les données reçues via l'API sont également sanitizées par le middleware `sanitizeRequestBody` avant d'être enregistrées en base de données. Cela protège l'inbox contre les injections XSS dans les soumissions de formulaires.

## Headers de sécurité HTTP (Helmet.js)

Puna utilise **Helmet.js** pour définir des headers HTTP de sécurité :

| Header                      | Description                                                       |
| --------------------------- | ----------------------------------------------------------------- |
| `Content-Security-Policy`   | Politique CSP stricte (séparée pour web et API)                   |
| `X-Content-Type-Options`    | Empêche le MIME sniffing (`nosniff`)                              |
| `X-Frame-Options`           | Empêche le framing de la page                                     |
| `X-XSS-Protection`          | Protection XSS du navigateur                                      |
| `Strict-Transport-Security` | HSTS (conditionnel, uniquement si `HELMET_STRICT_TRANSPORT=true`) |

### CSP séparée

Puna utilise deux politiques CSP distinctes :

- **Pages web** — CSP restrictive adaptée au dashboard (Tailwind, DaisyUI, ApexCharts, Font Awesome)
- **API** — CSP très stricte limitée au minimum nécessaire

## Résumé des protections

```
Requête entrante
    │
    ├──→ Helmet.js → Headers de sécurité HTTP
    │
    ├──→ CSRF → Double Submit Cookie (pages web seulement)
    │
    ├──→ XSS → Sanitization récursive de tous les inputs
    │
    └──→ Traitement sécurisé de la requête
```
