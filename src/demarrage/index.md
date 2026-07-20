---
title: Présentation du projet
---

# Présentation de Puna

Puna est un panneau d'administration **auto-hébergé** conçu pour centraliser les soumissions de tous vos formulaires web en un seul endroit.

## Principe en 3 étapes

1. **Créer un site et ses formulaires** dans Puna → obtenir un token JWT et le code du formulaire depuis la vue "API".
2. **Envoyer les soumissions** vers `POST /api/v1/send/:code` (JSON ou multipart/form-data).
3. **Consulter, filtrer et exporter** les données depuis l'interface Puna.

## Fonctionnalités clés

- **API unique** : support JSON et multipart/form-data depuis un seul endpoint
- **Export** : CSV, Excel (.xlsx) et archive ZIP des fichiers joints
- **RBAC** : 5 rôles (`super_admin`, `owner`, `unique`, `editor`, `viewer`)
- **Pièces jointes** : 12 types MIME acceptés + scan antivirus ClamAV (optionnel)
- **Serveur MCP** : intégration avec les agents IA (optionnel, voir [MCP & IA](../mcp/))
- **2FA TOTP** : authentification à deux facteurs (optionnel)

## Liens rapides

| Sujet                    | Lien                                                      |
| ------------------------ | --------------------------------------------------------- |
| Installation développeur | [Installation (dev)](./installation-dev.md)               |
| Installation Docker      | [Installation (production)](./installation-production.md) |
| Référence API            | [API](../api/)                                            |
| Serveur MCP              | [MCP & IA](../mcp/)                                       |
