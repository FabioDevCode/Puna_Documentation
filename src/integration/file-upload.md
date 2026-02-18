# Upload de fichiers

Puna supporte l'upload de fichiers joints aux soumissions via l'API en `multipart/form-data`. Cette page détaille les **types acceptés**, les **limites** et les **mécanismes de validation**.

## Types de fichiers acceptés

Les extensions suivantes sont autorisées :

| Catégorie     | Extensions                              |
| ------------- | --------------------------------------- |
| **Images**    | `.png`, `.jpg`, `.jpeg`, `.webp`        |
| **Documents** | `.pdf`, `.doc`, `.docx`, `.odt`, `.txt` |
| **Tableurs**  | `.xls`, `.xlsx`, `.csv`                 |

::: warning Validation stricte
Puna ne se fie pas uniquement à l'extension du fichier. Les **magic bytes** (signatures binaires en début de fichier) sont vérifiés pour détecter les fichiers dont l'extension est falsifiée.
:::

## Limites d'upload

| Paramètre                  | Valeur par défaut | Variable d'environnement |
| -------------------------- | ----------------- | ------------------------ |
| Taille max par fichier     | 10 Mo             | `API_MAX_FILE_SIZE`      |
| Taille totale max          | 50 Mo             | `API_MAX_TOTAL_SIZE`     |
| Nombre max de fichiers     | 10                | `API_MAX_FILES`          |
| Nombre max de champs       | 40                | `API_MAX_FIELDS`         |
| Taille max par champ texte | 10 000 caractères | `API_MAX_FIELD_SIZE`     |

## Protections de sécurité

### Validation par magic bytes

Chaque fichier uploadé est vérifié par ses **premiers octets** (magic bytes) pour s'assurer que le type réel correspond à l'extension déclarée. Un fichier `.pdf` qui serait en réalité un exécutable sera rejeté.

### Inspection des archives

Les fichiers d'archive (ZIP, DOCX, XLSX, PPTX, ODT) sont inspectés contre :

| Menace                 | Protection                              |
| ---------------------- | --------------------------------------- |
| **ZIP bombs**          | Ratio de compression max 100:1          |
| **Macros VBA**         | Détection et rejet des macros           |
| **Exécutables cachés** | Détection des fichiers exécutables      |
| **Path traversal**     | Vérification des chemins dans l'archive |

Autres limites sur les archives :

- **1 000 entrées** maximum par archive
- **250 Mo** décompressés maximum
- Noms de fichiers ≤ **255 caractères**

### Inspection des PDF

Les fichiers PDF sont analysés et **rejetés s'ils contiennent du JavaScript embarqué** (`/JavaScript`).

## Stockage des fichiers

Les fichiers uploadés sont stockés dans une arborescence organisée :

```
storage/uploads/
└── {domaine}/
    └── {nom_formulaire}/
        └── {code_formulaire}/
            └── {timestamp}_{nom_fichier}
```

- Les fichiers sont **renommés** avec un préfixe timestamp pour éviter les collisions
- Le **nom original** est restauré lors du téléchargement

## Exemple d'upload

```html
<form id="upload-form">
  <input type="text" name="nom" placeholder="Votre nom" required />
  <input type="file" name="document" accept=".pdf,.doc,.docx" />
  <input type="file" name="photo" accept=".png,.jpg,.jpeg,.webp" />
  <button type="submit">Envoyer</button>
</form>

<script>
  document
    .getElementById("upload-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const response = await fetch(
        "https://votre-puna.com/api/v1/send/VOTRE_CODE",
        {
          method: "POST",
          headers: {
            "X-KEY-PUNA": "puna",
            Authorization: "Bearer VOTRE_TOKEN_JWT",
          },
          body: formData,
        },
      );

      const result = await response.json();
      console.log(result);
    });
</script>
```

## Nettoyage automatique

- La suppression d'un **site** supprime tout le dossier `uploads/{domaine}/`
- La suppression d'un **formulaire** supprime le dossier du formulaire
- La suppression d'une **soumission** supprime ses fichiers individuels
