---
title: Outils disponibles
---

# Outils disponibles

Le serveur MCP de Puna expose **13 outils** répartis en 4 catégories. Chaque outil vérifie les droits d'accès de l'utilisateur associé à la clé MCP utilisée.

## Sites

| Outil              | Description                                        | Paramètres         |
| ------------------ | -------------------------------------------------- | ------------------ |
| `get_sites`        | Liste tous les sites accessibles par l'utilisateur | aucun              |
| `get_site_details` | Données d'un site + liste des formulaires associés | `site_id` (string) |

## Formulaires

| Outil              | Description                                           | Paramètres         |
| ------------------ | ----------------------------------------------------- | ------------------ |
| `get_forms`        | Liste tous les formulaires d'un site                  | `site_id` (string) |
| `get_form_details` | Colonnes, métadonnées et statistiques d'un formulaire | `form_id` (string) |

## Soumissions (Inbox)

| Outil                    | Description                                               | Paramètres clés                                    |
| ------------------------ | --------------------------------------------------------- | -------------------------------------------------- |
| `get_submissions`        | Liste les soumissions d'un formulaire (paginé, filtrable) | `form_id`, `page`, `limit`, `date_from`, `date_to` |
| `get_submission`         | Détail d'une soumission par son identifiant               | `submission_id`                                    |
| `get_recent_submissions` | Dernières soumissions tous formulaires confondus          | `limit` (max 50, défaut 10)                        |
| `search_submissions`     | Recherche full-text dans le contenu des soumissions       | `query`, `page`, `limit`                           |

## Statistiques

| Outil                  | Description                                                         | Paramètres clés          |
| ---------------------- | ------------------------------------------------------------------- | ------------------------ |
| `get_stats_submission` | Nombre de soumissions par jour sur une période                      | `days` (1–180, défaut 7) |
| `get_stats_heatmap`    | Heatmap des soumissions (jour de la semaine × heure)                | `days`                   |
| `get_stats_top_site`   | Sites avec le plus de soumissions                                   | `days`                   |
| `get_stats_top_form`   | Formulaires avec le plus de soumissions                             | `days`, `limit` (max 20) |
| `get_stats_summary`    | Résumé global : sites, formulaires, soumissions totales / jour / 7j | aucun                    |

## Permissions

Les droits d'accès respectent le [RBAC de Puna](../guide/administration.md) :

- Un `super_admin` voit l'ensemble des données.
- Un `viewer` ne voit que les sites qui lui sont explicitement assignés.
- Les vérifications sont effectuées via `checkSiteAccess`, `checkFormAccess` et `checkInboxAccess`.
