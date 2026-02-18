# FAQ — Questions fréquentes

## Général

### Qu'est-ce que Puna ?

Puna est une application web self-hosted de collecte et gestion de feedbacks. Elle centralise les soumissions de formulaires de vos sites web dans un dashboard unique et sécurisé.

### Puna est-il gratuit ?

Puna est distribué sous licence **GNU AGPLv3**. Le code source est libre.

### Quelles sont les limites de la Beta ?

| Ressource   | Limite             |
| ----------- | ------------------ |
| Sites       | 4 maximum          |
| Formulaires | 2 par site         |
| Soumissions | 200 par formulaire |

Voir [Limites du profil Beta](../guide/beta-limits.md) pour plus de détails.

---

## Compte et authentification

### Comment activer mon compte ?

Accédez à la page de première connexion de votre instance Puna, entrez votre login (fourni par l'administrateur) et définissez votre mot de passe. Voir [Premiers pas](../guide/getting-started.md).

### J'ai oublié mon mot de passe, que faire ?

Contactez l'administrateur de votre instance Puna. La fonctionnalité de réinitialisation de mot de passe sera disponible dans une prochaine version.

### Mon compte est bloqué après plusieurs tentatives

Le login est protégé par un rate limiting. Après **5 tentatives échouées**, vous devez attendre **15 minutes** avant de réessayer.

---

## Sites et formulaires

### Combien de sites puis-je créer ?

En Beta, vous pouvez créer jusqu'à **4 sites**.

### Combien de formulaires par site ?

En Beta, chaque site peut contenir jusqu'à **2 formulaires**.

### Comment obtenir le code de mon formulaire ?

Le code est généré automatiquement lors de la création du formulaire. Il est visible sur la page du formulaire dans le dashboard.

### Puis-je modifier le code d'un formulaire ?

Non, le code est généré automatiquement et ne peut pas être modifié. Il sert d'identifiant unique pour l'endpoint API.

---

## API et intégration

### Comment obtenir un token API ?

Sur la page de détail d'un site, cliquez sur **"Token"** pour générer un JWT. Voir [Tokens API](../guide/tokens.md).

### Mon token ne fonctionne plus

Si votre token a été révoqué (régénération du `control_code`), vous devez en générer un nouveau depuis le dashboard. Voir [Révocation de tokens](../guide/tokens.md#révoquer-les-tokens).

### Quels formats de données sont acceptés ?

L'API accepte :

- **`application/json`** pour les données texte uniquement
- **`multipart/form-data`** pour les données avec fichiers joints

### Quels types de fichiers puis-je envoyer ?

Extensions acceptées : `.png`, `.jpg`, `.jpeg`, `.webp`, `.pdf`, `.doc`, `.docx`, `.odt`, `.txt`, `.xls`, `.xlsx`, `.csv`. Voir [Upload de fichiers](../integration/file-upload.md).

### J'obtiens une erreur 429

Vous avez dépassé la limite de **30 requêtes par minute** pour ce formulaire. Attendez la réinitialisation du compteur. Voir [Rate Limiting](../integration/rate-limiting.md).

### J'obtiens une erreur 401

Votre token JWT est invalide, expiré ou a été révoqué. Générez un nouveau token depuis le dashboard.

### J'obtiens une erreur 403

Le header `X-KEY-PUNA` est manquant ou incorrect. Assurez-vous d'inclure `X-KEY-PUNA: puna` dans vos requêtes.

---

## Exports

### Dans quels formats puis-je exporter mes données ?

- **Excel** (`.xlsx`) — Avec en-têtes stylisés
- **CSV** — Compatible Excel (BOM UTF-8)
- **ZIP** — Pour les fichiers joints d'une soumission

### Les caractères accentués sont mal affichés dans le CSV

Le fichier CSV inclut un BOM UTF-8 pour la compatibilité Excel. Si le problème persiste, ouvrez le fichier avec l'option d'encodage **UTF-8** dans votre tableur.

---

## Sécurité

### Mes mots de passe sont-ils sécurisés ?

Oui, les mots de passe sont hashés avec **bcrypt** (10 salt rounds). Le mot de passe en clair n'est jamais stocké.

### Les données de mes formulaires sont-elles sécurisées ?

Oui. Toutes les données sont sanitizées contre le XSS, les fichiers sont validés (extensions + magic bytes + inspection des archives), et l'API est protégée par une authentification triple couche.

### Comment révoquer un token compromis ?

Sur la page du site, cliquez sur **"Révoquer les tokens"**. Tous les tokens existants seront invalidés et vous devrez en générer un nouveau.
