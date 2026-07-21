---
title: MCP & IA - Présentation
---

# MCP & IA - Présentation

## Qu'est-ce que le MCP ?

Le **Model Context Protocol (MCP)** est un standard ouvert permettant de connecter des agents IA à des sources de données externes. Il définit une interface standardisée par laquelle un assistant IA peut interroger des outils et récupérer des données structurées.

## À quoi ça sert dans Puna ?

Lorsque le serveur MCP est activé, un assistant IA compatible (Claude Desktop, Cursor, ChatGPT avec plugins…) peut interroger **directement** les données de Puna :

- Lister les sites et formulaires
- Consulter les soumissions récentes
- Rechercher dans le contenu des soumissions
- Obtenir des statistiques (heatmap, top formulaires, résumé global…)

Tout cela sans quitter l'interface de l'assistant.

## Activation

Ajouter dans le [`.env`](../demarrage/configuration.md) :

```bash
MCP_ENABLED=true
```

## Endpoint MCP

```
POST /mcp
```

Authentifié par un token Bearer - **clé MCP** générée depuis le [Profil](../guide/profil.md).

## Scopes disponibles

| Scope  | Accès                                 |
| ------ | ------------------------------------- |
| `read` | Lecture seule (seul scope disponible) |

## Sections de cette documentation

| Page                              | Description                                                |
| --------------------------------- | ---------------------------------------------------------- |
| [Connexion](./connexion.md)       | Générer une clé MCP et configurer Claude Desktop ou Cursor |
| [Outils disponibles](./outils.md) | Liste des 13 outils exposés par le serveur MCP             |
| [Exemples](./exemples.md)         | Cas d'usage et prompts concrets                            |
