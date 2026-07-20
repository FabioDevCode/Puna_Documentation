---
title: Exemples d'utilisation MCP
---

# Exemples d'utilisation concrète

Une fois le client MCP configuré (voir [Connexion](./connexion.md)), vous pouvez interroger Puna en langage naturel depuis votre assistant IA.

## Cas d'usage et prompts suggérés

### Statistiques et activité

> _"Quels sont mes formulaires les plus actifs cette semaine ?"_

→ Déclenche l'outil `get_stats_top_form` avec `days=7`.

---

> _"Combien de soumissions ai-je reçues aujourd'hui ?"_

→ Déclenche `get_stats_summary`, qui retourne les totaux du jour et des 7 derniers jours.

---

> _"Montre-moi la heatmap des soumissions du mois dernier."_

→ Déclenche `get_stats_heatmap` avec `days=30`, visualisé par l'assistant sous forme de tableau jour × heure.

### Consultation des soumissions

> _"Montre-moi les 10 dernières soumissions reçues."_

→ Déclenche `get_recent_submissions` avec `limit=10`.

---

> _"Cherche les soumissions qui mentionnent 'urgent'."_

→ Déclenche `search_submissions` avec `query="urgent"`.

---

> _"Génère un résumé des soumissions du formulaire de contact entre le 1er et le 15 juillet."_

→ Déclenche `get_submissions` avec `date_from=2026-07-01` et `date_to=2026-07-15`, puis l'assistant produit un résumé structuré.

### Navigation dans les données

> _"Liste tous mes sites et le nombre de formulaires de chacun."_

→ Enchaîne `get_sites` puis `get_site_details` pour chaque site retourné.

---

> _"Donne-moi les détails du formulaire 'Demande de devis' : colonnes disponibles et nombre de soumissions."_

→ Déclenche `get_form_details` sur le formulaire identifié.

## Référence des outils

Voir [Outils disponibles](./outils.md) pour la liste complète des 13 outils avec leurs paramètres.
