# Limites du profil Beta

En tant que Beta testeur, vous disposez de droits similaires à ceux d'un propriétaire de site (`owner`), avec des **limites de volume** spécifiques à la phase de test.

## Limites en chiffres

| Ressource       | Limite             | Description                                       |
| --------------- | ------------------ | ------------------------------------------------- |
| **Sites**       | 4 maximum          | Vous pouvez créer jusqu'à 4 sites                 |
| **Formulaires** | 2 par site         | Chaque site peut contenir au plus 2 formulaires   |
| **Soumissions** | 200 par formulaire | Chaque formulaire accepte au plus 200 soumissions |

## Permissions du rôle Beta

Le rôle `beta` a les mêmes permissions CRUD que le rôle `owner` :

| Entité    | Lire | Créer | Modifier | Supprimer |
| --------- | ---- | ----- | -------- | --------- |
| **Site**  | ✅   | ✅    | ✅       | ✅        |
| **Form**  | ✅   | ✅    | ✅       | ✅        |
| **Inbox** | ✅   | —     | —        | ✅        |

## Ce que le rôle Beta ne peut PAS faire

- **Accéder à l'administration** — Pas de gestion des utilisateurs
- **Voir les sites des autres** — Vous ne voyez que vos propres sites
- **Dépasser les limites de volume** — Un message d'erreur s'affiche si une limite est atteinte

## Que se passe-t-il en cas de limite atteinte ?

Lorsque vous atteignez une limite, l'action est bloquée et un **message d'avertissement** est affiché. Par exemple :

- **Sites** : le bouton "Créer un site" vous informe que vous avez atteint le maximum de 4 sites
- **Formulaires** : la création est refusée si le site a déjà 2 formulaires
- **Soumissions** : l'API renvoie une erreur si le formulaire a atteint 200 soumissions

::: tip Passage en production
Les limites Beta sont spécifiques à la phase de test. En version finale, les limites seront adaptées au plan choisi.
:::
