# Gestion des formulaires

Un **formulaire** dans Puna est un point de collecte rattaché à un site. Chaque formulaire possède un **code unique** qui sert d'endpoint pour l'API.

## Créer un formulaire

1. Accédez au détail de votre site
2. Cliquez sur **"Créer un formulaire"**
3. Donnez un **nom** au formulaire (ex : "Contact", "Devis", "Candidature")
4. Un **code unique** est automatiquement généré

Ce code est l'identifiant utilisé dans l'URL de l'API :

```
POST /api/v1/send/VOTRE_CODE
```

::: warning Limite Beta
En tant que Beta testeur, vous pouvez créer un maximum de **2 formulaires par site**.
:::

## Configurer les colonnes

Le tableau des soumissions affiche par défaut toutes les colonnes détectées. Vous pouvez personnaliser les colonnes visibles :

1. Accédez à la vue des soumissions du formulaire
2. Cliquez sur **"Colonnes"**
3. Cochez/décochez les colonnes à afficher
4. Validez

## Personnaliser le template

Le **template** est un mapping qui associe les noms de champs bruts à des **labels lisibles**.

Par exemple :

- `email_contact` → **"Email du contact"**
- `nom` → **"Nom"**
- `tel` → **"Téléphone"**

### Auto-apprentissage

À chaque nouvelle soumission, Puna détecte automatiquement les nouvelles clés et leur attribue un label basé sur le nom du champ (auto-capitalisé). Vous pouvez ensuite les personnaliser.

### Modifier le template

1. Accédez à la vue du formulaire
2. Cliquez sur **"Template"**
3. Modifiez les labels souhaités
4. Validez

## Supprimer un formulaire

1. Accédez au détail du site contenant le formulaire
2. Cliquez sur **"Supprimer le formulaire"**
3. Confirmez la suppression

::: danger Attention
La suppression d'un formulaire est **irréversible**. Elle entraîne la suppression de **toutes les soumissions** et de **tous les fichiers** associés.
:::

## Résumé des routes

| Action              | Route                     | Description                           |
| ------------------- | ------------------------- | ------------------------------------- |
| Création            | POST `/create-form`       | Crée un formulaire rattaché à un site |
| Suppression         | POST `/delete-form`       | Supprime le formulaire et ses données |
| Soumissions (inbox) | GET `/form/:id/inbox`     | Liste paginée avec filtres            |
| Colonnes            | POST `/form/:id/columns`  | Configure les colonnes du tableau     |
| Template            | POST `/form/:id/template` | Personnalise le mapping champs/labels |
