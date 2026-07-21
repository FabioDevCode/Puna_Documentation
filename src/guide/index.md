---
title: Vue d'ensemble de l'interface
---

# Vue d'ensemble de l'interface

Puna propose une interface organisée autour d'une sidebar gauche permettant de naviguer entre sites, formulaires et soumissions.

## Les 8 vues principales

| Vue                           | Description                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| **1. Tableau de bord**        | Statistiques globales : compteurs, graphiques (soumissions par jour, heatmap, top formulaires, top sites) |
| **2. Sites**                  | Liste de tous les sites enregistrés, regroupés avec leurs statistiques                                    |
| **3. API**                    | Pour chaque site : formulaires, token JWT et code d'intégration prêts à l'emploi                          |
| **4. Soumission**             | Détail complet d'une soumission : toutes les colonnes reçues et fichiers joints                           |
| **5. Admin - Vue d'ensemble** | Tableau de bord administrateur : utilisateurs, sites, formulaires, soumissions totales                    |
| **6. RBAC**                   | Gestion des utilisateurs et de leurs rôles                                                                |
| **7. Logs**                   | Visualiseur de journaux applicatifs intégré                                                               |
| **8. MCP**                    | Profil utilisateur et clés d'accès MCP                                                                    |

## Navigation principale

La sidebar gauche structure la navigation : **Sites → Formulaires → Inbox**. Chaque site est dépliable pour accéder directement à ses formulaires et aux soumissions associées.

## Sections de la documentation

| Section                               | Description                                               |
| ------------------------------------- | --------------------------------------------------------- |
| [Connexion](./connexion.md)           | Authentification, 2FA et réinitialisation du mot de passe |
| [Sites](./sites.md)                   | Création et gestion des sites                             |
| [Formulaires](./formulaires.md)       | Création et gestion des formulaires                       |
| [Soumissions](./soumissions.md)       | Consultation, filtres, export                             |
| [Profil](./profil.md)                 | Informations personnelles, 2FA, clés MCP                  |
| [Administration](./administration.md) | Utilisateurs, rôles RBAC, logs                            |
