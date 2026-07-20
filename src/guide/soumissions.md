---
title: Soumissions (Inbox)
---

# Soumissions (Inbox)

L'inbox regroupe toutes les soumissions reçues pour un formulaire donné.

## Accès

Naviguer vers un formulaire via la sidebar → cliquer sur **Inbox**.

## Filtres disponibles

- **Plage de dates** : filtrer les soumissions entre deux dates
- **Recherche** : recherche dans le contenu des soumissions

## Détail d'une soumission

La vue détail affiche :

- Toutes les colonnes reçues (normalisées par rapport au [template du formulaire](./formulaires.md))
- Les fichiers joints : miniature pour les images, lien de téléchargement pour les autres formats

## Export

| Format        | Contenu                                          |
| ------------- | ------------------------------------------------ |
| CSV           | Toutes les soumissions filtrées (UTF-8 avec BOM) |
| Excel (.xlsx) | Toutes les soumissions filtrées                  |
| Archive ZIP   | Fichiers joints de toutes les soumissions        |

## Suppression

Les soumissions peuvent être supprimées individuellement ou en masse, selon le rôle de l'utilisateur.

## Fichiers joints

- Stockés dans `storage/uploads/`
- **12 types MIME acceptés par défaut** (images, PDF, archives, documents Office…)
- Scannés automatiquement par ClamAV si activé — un fichier infecté est rejeté à la réception
- Voir [Authentification](../api/authentification.md) et [Format des données](../api/format-donnees.md) pour l'envoi de fichiers via l'API
