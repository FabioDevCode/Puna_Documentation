# Rate Limiting

Puna implémente un système de **rate limiting** (limitation de débit) pour protéger l'API contre les abus et garantir une disponibilité optimale.

## Limite par formulaire

| Paramètre        | Valeur par défaut | Variable d'environnement    |
| ---------------- | ----------------- | --------------------------- |
| Requêtes max     | 30                | `RATE_LIMIT_FORM_MAX`       |
| Fenêtre de temps | 60 secondes       | `RATE_LIMIT_FORM_WINDOW_MS` |

La clé de rate limiting est : `form:{siteId}:{formCode}`

Cela signifie que **chaque formulaire** dispose de sa propre limite indépendante.

## Headers de réponse

Chaque réponse API inclut des headers informatifs sur l'état du rate limiting :

| Header                | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `RateLimit-Limit`     | Nombre max de requêtes autorisées dans la fenêtre       |
| `RateLimit-Remaining` | Nombre de requêtes restantes                            |
| `RateLimit-Reset`     | Timestamp (secondes) de la réinitialisation du compteur |

## Réponse en cas de dépassement

Lorsque la limite est atteinte, l'API renvoie :

- **Code HTTP** : `429 Too Many Requests`
- **Message** : un message d'erreur en français

```json
{
  "success": false,
  "message": "Trop de requêtes. Veuillez réessayer plus tard."
}
```

## Gestion côté client

### Vérifier les headers

```javascript
async function envoyerAvecRateLimit(data) {
  const response = await fetch(
    "https://votre-puna.com/api/v1/send/VOTRE_CODE",
    {
      method: "POST",
      headers: {
        "X-KEY-PUNA": "puna",
        Authorization: "Bearer VOTRE_TOKEN_JWT",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  // Vérifier le rate limit
  const remaining = response.headers.get("RateLimit-Remaining");
  const resetTime = response.headers.get("RateLimit-Reset");

  console.log(`Requêtes restantes : ${remaining}`);

  if (response.status === 429) {
    const resetDate = new Date(resetTime * 1000);
    console.warn(
      `Rate limit atteint. Réessayez après : ${resetDate.toLocaleString()}`,
    );
    return null;
  }

  return await response.json();
}
```

### Retry automatique avec backoff

```javascript
async function envoyerAvecRetry(data, maxRetries = 3) {
  for (let tentative = 0; tentative < maxRetries; tentative++) {
    const response = await fetch(
      "https://votre-puna.com/api/v1/send/VOTRE_CODE",
      {
        method: "POST",
        headers: {
          "X-KEY-PUNA": "puna",
          Authorization: "Bearer VOTRE_TOKEN_JWT",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (response.status === 429) {
      const resetTime = response.headers.get("RateLimit-Reset");
      const attente = resetTime * 1000 - Date.now();
      console.warn(`Rate limit. Attente de ${Math.ceil(attente / 1000)}s...`);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(attente, 1000)),
      );
      continue;
    }

    return await response.json();
  }

  throw new Error("Nombre maximum de tentatives atteint.");
}
```

## Rate limiting sur le login

Le dashboard est également protégé par un rate limiting sur la page de connexion :

| Endpoint                            | Tentatives max | Fenêtre    |
| ----------------------------------- | -------------- | ---------- |
| `/dp-connect` (login)               | 5              | 15 minutes |
| `/dp-first-co` (première connexion) | 3              | 15 minutes |

## Bonnes pratiques

- **Ne surchargez pas** l'API avec des requêtes inutiles
- **Respectez les headers** `RateLimit-Remaining` pour adapter votre rythme d'envoi
- **Implémentez un retry** avec backoff exponentiel pour les cas de dépassement
- En cas d'envoi massif de données, **espacez les requêtes** dans le temps
