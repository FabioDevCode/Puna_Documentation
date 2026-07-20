---
title: Administration
---

# Administration

Les fonctionnalités d'administration sont accessibles aux rôles `super_admin` et `owner`.

## Gestion des utilisateurs

Depuis la vue Administration → Utilisateurs :

- **Créer un utilisateur** : renseigner login, email et rôle
- **Modifier le rôle** d'un utilisateur existant
- **Désactiver ou supprimer** un compte
- **Assigner un utilisateur** à un ou plusieurs sites (pour les rôles `editor` et `viewer`)

## Matrice des rôles (RBAC)

| Rôle          | Sites | Formulaires | Inbox | Utilisateurs | Remarques                             |
| ------------- | ----- | ----------- | ----- | ------------ | ------------------------------------- |
| `super_admin` | CRUD  | CRUD        | R + D | CRUD         | Accès total, non scopé                |
| `owner`       | CRUD  | CRUD        | R + D | CRUD         | Limité à ses propres sites            |
| `unique`      | CRUD  | CRUD        | R + D | —            | Max 4 sites, 2 formulaires, 200 inbox |
| `editor`      | R     | CRUD        | R + D | —            | Uniquement les sites assignés         |
| `viewer`      | R     | R           | R     | —            | Lecture seule sur les sites assignés  |

**Légende** : C = Créer, R = Lire, U = Modifier, D = Supprimer.

## Logs applicatifs

Puna intègre un visualiseur de logs directement dans l'interface d'administration.

- Les logs sont stockés dans le dossier `logs/` avec rotation automatique quotidienne.
- Les journaux couvrent les accès API, les erreurs applicatives et les actions d'audit.

## Tableau de bord administrateur

Le tableau de bord admin affiche une synthèse globale : nombre total d'utilisateurs, de sites, de formulaires et de soumissions.
