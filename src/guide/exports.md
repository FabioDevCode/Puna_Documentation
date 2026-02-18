# Export des données

Puna vous permet d'exporter vos données de soumissions dans plusieurs formats pour les exploiter dans vos outils habituels.

## Formats disponibles

| Format    | Extension | Description                                                         |
| --------- | --------- | ------------------------------------------------------------------- |
| **Excel** | `.xlsx`   | Fichier Excel avec en-têtes stylisés et colonnes auto-détectées     |
| **CSV**   | `.csv`    | Fichier CSV avec BOM UTF-8 pour compatibilité Excel                 |
| **ZIP**   | `.zip`    | Archive des fichiers joints d'une soumission (compression niveau 9) |

## Export par formulaire

### Export Excel

1. Accédez à la vue des soumissions d'un formulaire
2. Cliquez sur **"Export Excel"**
3. Le fichier `.xlsx` est téléchargé

Le fichier contient :

- Toutes les soumissions du formulaire
- Les colonnes avec les **labels personnalisés** (template)
- Les en-têtes **stylisés** automatiquement

```
GET /form/:id/export-excel
```

### Export CSV

1. Accédez à la vue des soumissions d'un formulaire
2. Cliquez sur **"Export CSV"**
3. Le fichier `.csv` est téléchargé

```
GET /form/:id/export-csv
```

::: tip Compatibilité Excel
Le fichier CSV inclut un **BOM UTF-8** pour garantir le bon affichage des caractères accentués dans Microsoft Excel. Le séparateur utilisé est la virgule (`,`).
:::

## Export des fichiers (ZIP)

Pour télécharger tous les fichiers joints d'une soumission en une seule archive :

1. Accédez au détail d'une soumission
2. Cliquez sur **"Télécharger ZIP"**
3. L'archive contient tous les fichiers de la soumission

```
GET /inbox/:inboxId/download-zip
```

## Récapitulatif

| Périmètre                 | Format        | Route                         |
| ------------------------- | ------------- | ----------------------------- |
| Formulaire complet        | Excel (.xlsx) | GET `/form/:id/export-excel`  |
| Formulaire complet        | CSV           | GET `/form/:id/export-csv`    |
| Fichiers d'une soumission | ZIP           | GET `/inbox/:id/download-zip` |
