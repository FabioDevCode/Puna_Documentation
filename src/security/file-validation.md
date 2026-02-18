# Validation des fichiers

Puna implémente une **validation rigoureuse** des fichiers uploadés pour protéger votre instance contre les fichiers malveillants.

## Validation en 3 étapes

### 1. Vérification de l'extension

Seules les extensions suivantes sont acceptées :

```
.png  .jpg  .jpeg  .webp
.pdf  .doc  .docx  .odt  .txt
.xls  .xlsx  .csv
```

Tout fichier avec une extension non autorisée est **immédiatement rejeté**.

### 2. Vérification des magic bytes

Les **magic bytes** sont les premiers octets d'un fichier qui identifient son vrai type, indépendamment de l'extension.

Par exemple :

- Un fichier PDF commence par `%PDF`
- Un fichier PNG commence par `‰PNG`
- Un fichier JPEG commence par `ÿØÿ`

Puna vérifie que les magic bytes correspondent à l'extension déclarée. Un fichier nommé `photo.png` qui est en réalité un exécutable sera **détecté et rejeté**.

### 3. Inspection approfondie du contenu

Certains types de fichiers font l'objet d'une **analyse supplémentaire**.

## Inspection des archives

Les fichiers d'archive sont inspectés en profondeur. Cela concerne les formats : **ZIP**, **DOCX**, **XLSX**, **PPTX**, **ODT** (qui sont tous des archives ZIP).

| Menace                 | Protection                                                |
| ---------------------- | --------------------------------------------------------- |
| **ZIP bombs**          | Le ratio de compression est limité à **100:1**            |
| **Macros VBA**         | Les fichiers contenant des macros VBA sont **rejetés**    |
| **Exécutables cachés** | Les fichiers exécutables dans l'archive sont **détectés** |
| **Path traversal**     | Les chemins avec `../` sont **bloqués**                   |

### Limites sur les archives

| Paramètre                         | Limite         |
| --------------------------------- | -------------- |
| Nombre max d'entrées              | 1 000          |
| Taille max décompressée           | 250 Mo         |
| Longueur max des noms de fichiers | 255 caractères |

## Inspection des PDF

Les fichiers PDF sont analysés pour détecter la présence de **JavaScript embarqué**. Un PDF contenant la directive `/JavaScript` est automatiquement **rejeté**.

::: warning
Les PDF interactifs avec des scripts JavaScript intégrés ne sont pas acceptés par Puna. Si vous avez besoin d'envoyer des PDF avec des formulaires interactifs, assurez-vous qu'ils ne contiennent pas de scripts.
:::

## Nommage sécurisé des fichiers

Les fichiers uploadés sont automatiquement :

- **Sanitizés** — les caractères spéciaux sont retirés du nom
- **Préfixés** avec un timestamp pour éviter les collisions
- **Protégés** contre le path traversal sur tous les chemins

Format final : `{timestamp}_{nom_sanitize}`

## Événements de sécurité

Chaque fichier rejeté est enregistré dans les logs :

| Événement      | Logger(s)   | Description                                           |
| -------------- | ----------- | ----------------------------------------------------- |
| Fichier rejeté | api + error | Extension, magic bytes invalides ou contenu dangereux |
