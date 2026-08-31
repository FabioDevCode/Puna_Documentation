---
title: Soumissions (Inbox)
---

# Soumissions

Les soumissions reçues sont affichées sous forme de liste dans la page d'un **Site** en fonction de l'onglet **Formulaire** sélectionné.

<img :src="$withBase('/img/3-site-show.png')" alt="Liste des soumissions">

## Filtres disponibles

- **Plage de dates** : filtrer les soumissions entre deux dates
- **Recherche** : recherche dans le contenu des soumissions

## Détail d'une soumission

La vue détail affiche :

- Toutes les colonnes reçues (normalisées par rapport au [template du formulaire](./formulaires.md))
- Les fichiers joints : miniature pour les images, lien de téléchargement pour les autres formats

<img :src="$withBase('/img/4-inbox-soumission.png')" alt="Show d'une soumission">

## Export

| Format        | Contenu                                          |
| ------------- | ------------------------------------------------ |
| CSV           | Toutes les soumissions filtrées (UTF-8 avec BOM) |
| Excel (.xlsx) | Toutes les soumissions filtrées                  |
| Archive ZIP   | Fichiers joints de toutes les soumissions        |

## Suppression

Les soumissions peuvent être supprimées individuellement ou en masse, selon le rôle de l'utilisateur.
