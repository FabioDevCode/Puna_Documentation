# Changelog

Journal des modifications de Puna.

## v0.0.1 — Beta (2026)

**Lancement initial en Beta Test.**

### Fonctionnalités

- **Dashboard** avec statistiques et graphiques (ApexCharts)
  - Compteurs de sites, formulaires et soumissions
  - Graphiques : Inbox Counts, Inbox Percentages, Top Forms, Top Site Radial, Site Distribution, Inbox Heatmap
- **Gestion des sites**
  - Création, consultation, suppression de sites
  - Génération et révocation de tokens JWT
- **Gestion des formulaires**
  - Création et suppression de formulaires
  - Configuration des colonnes visibles
  - Personnalisation du template (mapping champs/labels)
  - Auto-apprentissage du schéma à chaque soumission
- **API REST** — `POST /api/v1/send/:code`
  - Support JSON et multipart/form-data
  - Authentification triple couche (header + JWT chiffré AES + code formulaire)
  - Pipeline de 9 middlewares de traitement
  - Rate limiting par formulaire (30 req/min)
- **Gestion des soumissions (inbox)**
  - Consultation avec pagination et filtres avancés
  - Détail avec fichiers joints
  - Téléchargement individuel et ZIP
- **Exports** — Excel (.xlsx), CSV (BOM UTF-8), ZIP
- **Upload de fichiers**
  - Validation par extension + magic bytes
  - Inspection des archives (ZIP bombs, macros VBA, exécutables, path traversal)
  - Inspection des PDF (rejet JavaScript embarqué)
- **Sécurité**
  - Helmet.js (CSP stricte)
  - Protection CSRF (Double Submit Cookie)
  - Sanitization XSS récursive
  - Rate limiting sur le login (5 tentatives/15min)
  - Sessions en BDD (MariaDB)
  - Logging d'audit (Pino)
- **Rôle Beta** — droits similaires à `owner` avec limites de volume (4 sites, 2 forms/site, 200 inbox/form)

### Technique

- Express 5, Sequelize 6, MariaDB
- ESM modules
- Handlebars (SSR), TailwindCSS + DaisyUI v4
- 4 loggers Pino spécialisés avec rotation quotidienne
- Validation de l'environnement au démarrage
