# Premiers pas

Ce guide vous accompagne étape par étape pour activer votre compte et commencer à utiliser Puna.

## Étape 1 — Activation du compte

Lorsqu'un administrateur crée votre compte, celui-ci est en statut **`pending`** (en attente) et ne possède pas encore de mot de passe.

Pour activer votre compte :

1. Accédez à l'URL de votre instance Puna
2. Vous arrivez sur la page de **première connexion** (`/dp-first-connexion`)
3. Entrez votre **login** (fourni par l'administrateur)
4. Définissez votre **mot de passe** et confirmez-le
5. Votre compte passe en statut **`active`**
6. Vous êtes redirigé vers la page de connexion

::: warning Attention
Vous ne pouvez pas vous connecter tant que votre compte n'est pas activé. L'activation est **obligatoire** lors de la première connexion.
:::

## Étape 2 — Connexion

Une fois votre compte activé :

1. Accédez à la page de connexion (`/dp-login`)
2. Saisissez votre **login** et votre **mot de passe**
3. Cliquez sur **Se connecter**
4. Vous êtes redirigé vers le [Dashboard](./dashboard.md)

::: tip Sécurité
Le login est protégé par un **rate limiting** : après 5 tentatives échouées, vous devrez attendre **15 minutes** avant de réessayer.
:::

## Étape 3 — Découvrir le Dashboard

Après connexion, vous arrivez sur le **Dashboard** qui affiche vos statistiques globales. Le menu latéral vous donne accès à :

- **Dashboard** — Statistiques et graphiques
- **Sites** — Gestion de vos sites et formulaires

## Étape 4 — Créer votre premier site

1. Cliquez sur **"Créer un site"**
2. Entrez le nom de domaine de votre site (ex : `monsite.fr`)
3. Un `control_code` est généré automatiquement
4. Vous êtes redirigé vers la page du site

➡️ Détails : [Gestion des sites](./sites.md)

## Étape 5 — Créer un formulaire

1. Sur la page de votre site, cliquez sur **"Créer un formulaire"**
2. Donnez un nom au formulaire (ex : "Contact")
3. Un **code unique** est généré — c'est votre endpoint API

➡️ Détails : [Gestion des formulaires](./forms.md)

## Étape 6 — Générer un Token API

1. Sur la page de votre site, cliquez sur **"Token"**
2. Un **token JWT** est généré
3. **Copiez ce token** — il sera utilisé dans vos appels API

➡️ Détails : [Tokens API](./tokens.md)

## Étape 7 — Intégrer sur votre site web

Utilisez le token et le code du formulaire pour envoyer des soumissions depuis votre site :

```html
<form id="contact-form">
  <input type="text" name="nom" placeholder="Votre nom" required />
  <input type="email" name="email" placeholder="Votre email" required />
  <textarea name="message" placeholder="Votre message"></textarea>
  <button type="submit">Envoyer</button>
</form>

<script>
  document
    .getElementById("contact-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

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

      const result = await response.json();
      console.log(result);
    });
</script>
```

➡️ Détails : [Intégration](../integration/)

## Étape 8 — Consulter les soumissions

Les soumissions apparaissent dans l'onglet du formulaire sur la page du site. Vous pouvez :

- Voir le détail d'une soumission
- Télécharger les fichiers joints
- Filtrer et exporter les données

➡️ Détails : [Soumissions](./inbox.md) | [Exports](./exports.md)

## Récapitulatif du parcours

```
Activation du compte → Connexion → Créer un site → Créer un formulaire
→ Générer un token → Intégrer l'API → Recevoir des soumissions → Exporter
```
