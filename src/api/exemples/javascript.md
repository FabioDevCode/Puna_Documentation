---
title: Exemples JavaScript (Node.js)
---

# Exemples JavaScript (Node.js)

::: warning Appel depuis un serveur uniquement
Les credentials (`X-KEY-PUNA`, token JWT) ne doivent **jamais** être exposés dans du code exécuté dans le navigateur. Ces exemples sont destinés à un environnement **Node.js côté serveur**.

Pour obtenir les valeurs nécessaires, voir [Authentification](../authentification.md).
:::

## Exemple 1 - Envoi JSON

```js
// Valeurs à récupérer depuis :
// - API_KEY du .env  → header X-KEY-PUNA
// - Vue "API" du site → Authorization Bearer
// - Vue "API" du formulaire → code dans l'URL
const PUNA_API_KEY = "gk_prod_7f3a2b9c";
const PUNA_SITE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImNjIjoiYWJjMTIzIn0.SIGNATURE";
const FORM_CODE = "contact_acme_corp";

async function sendContactForm(data) {
  const response = await fetch(
    `https://votre-puna.example.com/api/v1/send/${FORM_CODE}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-KEY-PUNA": PUNA_API_KEY,
        Authorization: `Bearer ${PUNA_SITE_TOKEN}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Erreur Puna ${response.status}: ${error.error || error.message}`,
    );
  }

  return response.json(); // { success: true }
}

// Utilisation
await sendContactForm({
  nom: "Alice Martin",
  email: "alice@example.com",
  message: "Bonjour, je souhaite obtenir un devis.",
});
```

## Exemple 2 - Envoi Multipart avec fichier joint

```js
import { FormData, File } from "node:buffer"; // Node.js >= 18
import { readFile } from "node:fs/promises";

const PUNA_API_KEY = "gk_prod_7f3a2b9c";
const PUNA_SITE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImNjIjoiYWJjMTIzIn0.SIGNATURE";
const FORM_CODE = "devis_acme_corp";

async function sendFormWithAttachment(fields, filePath) {
  const fileBuffer = await readFile(filePath);
  const fileName = filePath.split("/").pop();

  const formData = new FormData();
  formData.append("nom", fields.nom);
  formData.append("email", fields.email);
  formData.append("message", fields.message);
  formData.append("document", new File([fileBuffer], fileName));

  const response = await fetch(
    `https://votre-puna.example.com/api/v1/send/${FORM_CODE}`,
    {
      method: "POST",
      headers: {
        "X-KEY-PUNA": PUNA_API_KEY,
        Authorization: `Bearer ${PUNA_SITE_TOKEN}`,
        // Ne pas définir Content-Type manuellement - fetch le fait automatiquement avec le boundary
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Erreur Puna ${response.status}: ${error.error || error.message}`,
    );
  }

  return response.json(); // { success: true }
}

// Utilisation
await sendFormWithAttachment(
  {
    nom: "Bob Dupont",
    email: "bob@example.com",
    message: "Voir document joint.",
  },
  "./devis_projet.pdf",
);
```
