---
title: Questions fréquentes
---

# Questions fréquentes

## Hébergement et données

**Est-ce que Puna stocke les données dans le cloud ?**

Non. Puna est entièrement **auto-hébergé**. Vos données restent sur votre propre infrastructure, dans la base de données MariaDB et dans le dossier `storage/` de votre serveur.

---

**Peut-on utiliser Puna sans MariaDB ?**

La variable `DB_DIALECT` accepte `mysql`, `postgres` et `sqlite`, mais seul **MariaDB est officiellement testé**. Les autres dialectes peuvent fonctionner mais ne bénéficient pas du même niveau de support.

## Fonctionnalités optionnelles

**Que se passe-t-il si SMTP n'est pas configuré ?**

La réinitialisation de mot de passe et les emails de bienvenue sont **silencieusement désactivés**. L'application fonctionne normalement pour toutes les autres fonctionnalités.

---

**L'upload de fichiers fonctionne-t-il sans ClamAV ?**

Oui. Si `CLAMAV_ENABLED=false` (ou si la variable est absente), les fichiers sont acceptés sans scan antivirus. Le pipeline de validation (extension + magic bytes + inspection des archives) reste actif.

---

**Peut-on utiliser Puna sans le serveur MCP ?**

Oui. `MCP_ENABLED=false` par défaut. Le serveur MCP est entièrement optionnel et n'a aucun impact sur le fonctionnement de l'application si désactivé.

## Gestion des accès

**Quel rôle doit-on attribuer à un développeur externe ?**

- `editor` : s'il doit gérer les formulaires et consulter les soumissions.
- `viewer` : s'il doit seulement consulter les données en lecture seule.

Voir la [matrice des rôles](../guide/administration.md) pour le détail complet des permissions.
