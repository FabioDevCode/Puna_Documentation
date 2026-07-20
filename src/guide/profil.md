---
title: Profil utilisateur
---

# Profil utilisateur

La page Profil est accessible depuis le menu utilisateur en haut à droite de l'interface.

## Informations personnelles

Modifier le **login**, l'**email** et le **mot de passe** depuis cette page.

## Authentification à deux facteurs (2FA TOTP)

Activer ou désactiver le 2FA TOTP depuis le profil. Cette fonctionnalité est disponible uniquement si `TOTP_ENABLED=true` dans la [Configuration](../demarrage/configuration.md).

Voir [Connexion & authentification](./connexion.md) pour le détail de la procédure d'activation.

## Clés MCP

::: tip
La section Clés MCP n'est visible que si `MCP_ENABLED=true` dans la [Configuration](../demarrage/configuration.md).
:::

Les clés MCP permettent à un agent IA de se connecter au serveur MCP de Puna.

**Depuis le profil, vous pouvez :**

- Créer une nouvelle clé MCP (en lui donnant un nom libre)
- Copier le token généré — **il ne sera affiché qu'une seule fois**
- Révoquer une clé existante

Pour configurer un client MCP avec votre clé, voir [Connexion MCP](../mcp/connexion.md).
