---
title: Connexion avec un client MCP
---

# Connexion avec un client MCP

## Prérequis

Le serveur MCP doit être activé (`MCP_ENABLED=true` dans le [`.env`](../demarrage/configuration.md)) et Puna doit être accessible depuis le réseau du client MCP.

## Étape 1 - Générer une clé MCP

1. Aller dans le [Profil](../guide/profil.md) → section **Clés MCP**.
2. Cliquer sur **Créer une clé** et lui donner un nom libre (ex. : "Claude Desktop personnel").
3. Copier le token généré - **il ne sera affiché qu'une seule fois**. En cas de perte, révoquer et recréer une clé.

## Étape 2 - Configurer le client

### Claude Desktop

Ajouter dans `claude_desktop_config.json` (accessible via les paramètres de Claude Desktop) :

```json
{
  "mcpServers": {
    "puna": {
      "type": "http",
      "url": "https://votre-puna.example.com/mcp",
      "headers": {
        "Authorization": "Bearer VOTRE_CLE_MCP"
      }
    }
  }
}
```

Remplacer `VOTRE_CLE_MCP` par le token copié à l'étape précédente, et `votre-puna.example.com` par le domaine de votre instance Puna.

### Cursor

Dans les paramètres MCP de Cursor (**Settings → MCP**), ajouter un serveur HTTP :

- **URL** : `https://votre-puna.example.com/mcp`
- **Header** : `Authorization: Bearer VOTRE_CLE_MCP`

## Révocation d'une clé

Depuis le [Profil](../guide/profil.md) → section **Clés MCP**, cliquer sur **Révoquer** en regard de la clé concernée. L'accès est immédiatement désactivé.
