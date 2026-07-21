---
title: Administration
---

# Administration

Les fonctionnalités d'administration sont accessibles aux rôles `super_admin` et `owner`.

## Tableau de bord (admin)

Le tableau de bord admin affiche une synthèse globale : nombre total d'utilisateurs, de sites, de formulaires et de soumissions.

![Administration](/img/6-administration.png)

## Gestion des utilisateurs

Depuis la vue Administration → Utilisateurs :

- **Créer un utilisateur** : renseigner login, email et rôle
- **Modifier le rôle** d'un utilisateur existant
- **Désactiver ou supprimer** un compte
- **Assigner un utilisateur** à un ou plusieurs sites (pour les rôles `editor` et `viewer`)

![Liste des utilisateurs](/img/7-user-list.png)

## Logs applicatifs

Puna intègre un visualiseur de logs directement dans l'interface d'administration.

- Les logs sont stockés dans le dossier `logs/` avec rotation automatique quotidienne.
- Les journaux couvrent les accès API, les erreurs applicatives et les actions d'audit.

![Liste des utilisateurs](/img/8-logs.png)
