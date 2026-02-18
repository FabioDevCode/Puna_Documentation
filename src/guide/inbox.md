# Soumissions (Inbox)

Les **soumissions** (ou **inbox**) sont les données reçues via l'API pour un formulaire donné. Chaque soumission contient les données JSON envoyées et, éventuellement, des fichiers joints.

## Consulter les soumissions

### Tableau des soumissions

Accessible depuis la page d'un formulaire (`/form/:id/inbox`), le tableau affiche toutes les soumissions reçues avec :

- Les colonnes configurées (voir [Formulaires — Colonnes](./forms.md#configurer-les-colonnes))
- La date de réception
- Les labels personnalisés (voir [Formulaires — Template](./forms.md#personnaliser-le-template))

### Pagination

Vous pouvez choisir le nombre d'entrées affichées par page :

- **10**, **25**, **50** ou **100** entrées par page

### Filtrage avancé

Le tableau supporte un **filtrage avancé** basé sur le contenu JSON des soumissions. Les filtres utilisent des requêtes `JSON_EXTRACT` pour rechercher dans les champs des soumissions.

## Détail d'une soumission

En cliquant sur une soumission, la page de détail (`/inbox/:id/view`) affiche :

- Toutes les **données texte** de la soumission
- Les **fichiers joints** avec leur type et icône
- Les actions de téléchargement

## Fichiers joints

### Télécharger un fichier

Cliquez sur le nom du fichier pour le télécharger individuellement.

```
GET /inbox/:inboxId/download/:filename
```

### Télécharger tous les fichiers (ZIP)

Si une soumission contient plusieurs fichiers, vous pouvez télécharger une **archive ZIP** de l'ensemble :

```
GET /inbox/:inboxId/download-zip
```

::: tip
L'archive ZIP est compressée au niveau 9 pour un téléchargement optimisé.
:::

## Supprimer une soumission

1. Accédez au détail de la soumission
2. Cliquez sur **"Supprimer"**
3. Confirmez la suppression

::: danger Attention
La suppression d'une soumission est **irréversible**. Elle entraîne la suppression de l'entrée en base de données **et** de tous les fichiers physiques associés.
:::

## Résumé des routes

| Action                 | Route                                    | Description                       |
| ---------------------- | ---------------------------------------- | --------------------------------- |
| Détail                 | GET `/inbox/:id/view`                    | Données texte + fichiers joints   |
| Suppression            | POST `/inbox/:id/delete`                 | Supprime l'entrée et ses fichiers |
| Téléchargement fichier | GET `/inbox/:inboxId/download/:filename` | Télécharge un fichier individuel  |
| Téléchargement ZIP     | GET `/inbox/:inboxId/download-zip`       | Archive ZIP de tous les fichiers  |
