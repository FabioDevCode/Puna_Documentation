# Gestion des sites

Un **site** dans Puna représente un domaine web (ex : `monsite.fr`). C'est le conteneur principal de vos formulaires.

## Liste des sites

Accessible via **Sites → Tous les sites** (`/site/all`).

Cette page affiche tous vos sites avec, pour chacun :

- Le **nom de domaine**
- Le nombre de **formulaires**
- Le nombre total de **soumissions**

## Créer un site

1. Cliquez sur le bouton **"Créer un site"**
2. Renseignez le **nom de domaine** de votre site (ex : `monsite.fr`)
3. Validez la création

Un **`control_code`** (code secret de 16 caractères) est automatiquement généré. Ce code est utilisé en interne pour la génération des tokens JWT.

::: warning Limite Beta
En tant que Beta testeur, vous pouvez créer un maximum de **4 sites**.
:::

## Détail d'un site

La page de détail (`/site/:id/view`) d'un site affiche :

- Les informations du site (domaine, date de création)
- Les **formulaires** rattachés, présentés sous forme d'onglets
- Les actions disponibles (token, suppression)

## Supprimer un site

1. Accédez au détail du site
2. Cliquez sur **"Supprimer le site"**
3. Confirmez en saisissant le **nom de domaine** du site

::: danger Attention
La suppression d'un site est **irréversible**. Elle entraîne :

- La suppression de **tous les formulaires** rattachés
- La suppression de **toutes les soumissions** de ces formulaires
- La suppression de **tous les fichiers uploadés** associés
- L'**invalidation de tous les tokens JWT** du site
  :::

## Générer un Token API

Voir la page dédiée : [Tokens API](./tokens.md)

## Révoquer les tokens

Voir la page dédiée : [Tokens API — Révocation](./tokens.md#révoquer-les-tokens)
