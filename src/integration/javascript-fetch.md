# Intégration JavaScript (fetch / axios)

Cette page détaille l'intégration de Puna avec JavaScript pur (`fetch`) et avec la librairie **axios**.

## Avec fetch — JSON

Pour envoyer des données **sans fichiers**, utilisez `application/json` :

```javascript
async function envoyerDonnees(data) {
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

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return await response.json();
}

// Utilisation
envoyerDonnees({
  nom: "Jean Dupont",
  email: "jean@exemple.fr",
  message: "Bonjour !",
}).then((result) => console.log(result));
```

## Avec fetch — FormData (fichiers)

Pour envoyer des données **avec fichiers**, utilisez `FormData` :

```javascript
async function envoyerFormulaire(formElement) {
  const formData = new FormData(formElement);

  const response = await fetch(
    "https://votre-puna.com/api/v1/send/VOTRE_CODE",
    {
      method: "POST",
      headers: {
        "X-KEY-PUNA": "puna",
        Authorization: "Bearer VOTRE_TOKEN_JWT",
        // Ne PAS définir Content-Type avec FormData !
      },
      body: formData,
    },
  );

  return await response.json();
}
```

::: warning Important
Ne définissez **pas** le header `Content-Type` manuellement lorsque vous utilisez `FormData`. Le navigateur le fera automatiquement avec le bon `boundary`.
:::

## Avec fetch — FormData construit manuellement

```javascript
async function envoyerAvecFichier(nom, email, fichier) {
  const formData = new FormData();
  formData.append("nom", nom);
  formData.append("email", email);
  formData.append("document", fichier); // objet File

  const response = await fetch(
    "https://votre-puna.com/api/v1/send/VOTRE_CODE",
    {
      method: "POST",
      headers: {
        "X-KEY-PUNA": "puna",
        Authorization: "Bearer VOTRE_TOKEN_JWT",
      },
      body: formData,
    },
  );

  return await response.json();
}

// Utilisation avec un input file
const fileInput = document.querySelector('input[type="file"]');
envoyerAvecFichier("Jean", "jean@exemple.fr", fileInput.files[0]);
```

## Avec axios — JSON

```javascript
import axios from "axios";

const punaClient = axios.create({
  baseURL: "https://votre-puna.com/api/v1",
  headers: {
    "X-KEY-PUNA": "puna",
    Authorization: "Bearer VOTRE_TOKEN_JWT",
  },
});

// Envoi JSON
async function envoyerDonnees(data) {
  const { data: result } = await punaClient.post("/send/VOTRE_CODE", data);
  return result;
}

envoyerDonnees({
  nom: "Jean Dupont",
  email: "jean@exemple.fr",
});
```

## Avec axios — FormData

```javascript
import axios from "axios";

async function envoyerFormulaire(formElement) {
  const formData = new FormData(formElement);

  const { data } = await axios.post(
    "https://votre-puna.com/api/v1/send/VOTRE_CODE",
    formData,
    {
      headers: {
        "X-KEY-PUNA": "puna",
        Authorization: "Bearer VOTRE_TOKEN_JWT",
      },
    },
  );

  return data;
}
```

## Gestion des erreurs

```javascript
async function envoyerAvecGestionErreurs(data) {
  try {
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
      console.warn("Rate limit atteint. Réessayez plus tard.");
      return;
    }

    if (response.status === 401) {
      console.error("Token invalide ou expiré.");
      return;
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log("Succès :", result);
    return result;
  } catch (error) {
    console.error("Erreur réseau :", error.message);
  }
}
```

## Depuis Node.js (backend)

```javascript
// Node.js 18+ avec fetch natif
async function envoyerDepuisServeur(data) {
  const response = await fetch(
    "https://votre-puna.com/api/v1/send/VOTRE_CODE",
    {
      method: "POST",
      headers: {
        "X-KEY-PUNA": "puna",
        Authorization: `Bearer ${process.env.PUNA_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return await response.json();
}
```

::: tip Bonne pratique
Pour les intégrations côté serveur (Node.js, backend), stockez le token dans une **variable d'environnement** plutôt que dans le code source.
:::
