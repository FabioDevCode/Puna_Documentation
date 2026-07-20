---
title: Exemples Python (requests)
---

# Exemples Python (requests)

::: warning Appel depuis un serveur uniquement
Les credentials (`X-KEY-PUNA`, token JWT) ne doivent **jamais** être exposés dans du code côté client. Ces exemples sont destinés à être exécutés depuis un **backend Python**.

Pour obtenir les valeurs nécessaires, voir [Authentification](../authentification.md).
:::

## Installation de la dépendance

```bash
pip install requests
```

## Exemple 1 — Envoi JSON

```python
import requests

# Valeurs à récupérer depuis :
# - API_KEY du .env  → header X-KEY-PUNA
# - Vue "API" du site → Authorization Bearer
# - Vue "API" du formulaire → code dans l'URL
PUNA_API_KEY    = "gk_prod_7f3a2b9c"
PUNA_SITE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImNjIjoiYWJjMTIzIn0.SIGNATURE"
FORM_CODE       = "contact_acme_corp"

headers = {
    "X-KEY-PUNA": PUNA_API_KEY,
    "Authorization": f"Bearer {PUNA_SITE_TOKEN}",
}

payload = {
    "nom": "Alice Martin",
    "email": "alice@example.com",
    "message": "Bonjour, je souhaite obtenir un devis.",
}

response = requests.post(
    f"https://votre-puna.example.com/api/v1/send/{FORM_CODE}",
    json=payload,
    headers=headers,
    timeout=10,
)
response.raise_for_status()  # lève une exception si code HTTP != 2xx

result = response.json()  # {"success": True}
```

## Exemple 2 — Envoi Multipart avec fichier joint

```python
import requests

PUNA_API_KEY    = "gk_prod_7f3a2b9c"
PUNA_SITE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImNjIjoiYWJjMTIzIn0.SIGNATURE"
FORM_CODE       = "devis_acme_corp"
FILE_PATH       = "./devis_projet.pdf"

headers = {
    "X-KEY-PUNA": PUNA_API_KEY,
    "Authorization": f"Bearer {PUNA_SITE_TOKEN}",
    # Ne pas définir Content-Type manuellement — requests le fait avec le boundary
}

fields = {
    "nom": "Bob Dupont",
    "email": "bob@example.com",
    "message": "Voir document joint.",
}

with open(FILE_PATH, "rb") as f:
    files = {
        "document": (
            "devis_projet.pdf",
            f,
            "application/pdf",
        )
    }
    response = requests.post(
        f"https://votre-puna.example.com/api/v1/send/{FORM_CODE}",
        data=fields,
        files=files,
        headers=headers,
        timeout=30,
    )

response.raise_for_status()
result = response.json()  # {"success": True}
```
