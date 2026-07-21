---
title: Contribuer au projet
---

# Contribuer au projet

## Signaler un bug

Ouvrir une issue GitHub en utilisant le template **"Bug report"** disponible dans l'onglet Issues du dépôt. Inclure les étapes de reproduction, le comportement attendu et le comportement observé.

## Proposer une fonctionnalité

Ouvrir une issue GitHub en utilisant le template **"Demande de fonctionnalité"**. Décrire le besoin, le cas d'usage et la valeur apportée.

## Signaler une faille de sécurité

::: danger Ne pas créer une issue publique pour une faille de sécurité
Utiliser le **GitHub Private Vulnerability Reporting** : onglet Security du dépôt → "Report a vulnerability". Cela garantit une divulgation responsable et coordonnée.
:::

Seule la **dernière version** de Puna bénéficie de correctifs de sécurité.

## Contribuer du code

1. **Forker** le dépôt sur GitHub.
2. Créer une branche depuis `develop` :
   - `feature/nom-de-la-fonctionnalite` pour une nouvelle fonctionnalité
   - `fix/description-du-bug` pour une correction
3. Ouvrir une **Pull Request** vers la branche `develop` (pas `main`).
4. Décrire clairement les changements apportés et les tests effectués.

## Code de conduite

Toutes les interactions liées au projet (issues, PR, discussions) sont soumises au `CODE_OF_CONDUCT.md` du dépôt. Le respect mutuel est attendu de tous les contributeurs.

## Licence

Puna est distribué sous licence **AGPLv3**. Toute modification distribuée - y compris les forks en production - doit rester sous AGPLv3 et rendre le code source accessible.
