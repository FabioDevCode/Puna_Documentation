# Intégration — Formulaire HTML

Cette page montre comment intégrer Puna avec un **formulaire HTML classique** en utilisant JavaScript pour l'envoi.

## Formulaire basique (sans fichiers)

```html
<form id="contact-form">
  <div>
    <label for="nom">Nom</label>
    <input type="text" id="nom" name="nom" required />
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <label for="message">Message</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <button type="submit">Envoyer</button>
</form>

<script>
  document
    .getElementById("contact-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      try {
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

        if (response.ok) {
          alert("Message envoyé avec succès !");
          e.target.reset();
        } else {
          alert("Erreur lors de l'envoi.");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Impossible de contacter le serveur.");
      }
    });
</script>
```

::: tip FormData
En utilisant `FormData`, vous n'avez pas besoin de définir le header `Content-Type` — le navigateur le fait automatiquement avec le bon `boundary` pour `multipart/form-data`.
:::

## Formulaire avec fichiers joints

```html
<form id="candidature-form">
  <div>
    <label for="nom">Nom complet</label>
    <input type="text" id="nom" name="nom" required />
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <label for="poste">Poste souhaité</label>
    <input type="text" id="poste" name="poste" />
  </div>
  <div>
    <label for="cv">CV (PDF)</label>
    <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" />
  </div>
  <div>
    <label for="motivation">Lettre de motivation</label>
    <input
      type="file"
      id="motivation"
      name="motivation"
      accept=".pdf,.doc,.docx"
    />
  </div>
  <button type="submit">Postuler</button>
</form>

<script>
  document
    .getElementById("candidature-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);

      try {
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

        if (result.success) {
          alert("Candidature envoyée !");
          e.target.reset();
        } else {
          alert("Erreur lors de l'envoi.");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    });
</script>
```

## Formulaire de demande de devis

```html
<form id="devis-form">
  <div>
    <label for="entreprise">Entreprise</label>
    <input type="text" id="entreprise" name="entreprise" required />
  </div>
  <div>
    <label for="contact">Nom du contact</label>
    <input type="text" id="contact" name="contact" required />
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />
  </div>
  <div>
    <label for="telephone">Téléphone</label>
    <input type="tel" id="telephone" name="telephone" />
  </div>
  <div>
    <label for="budget">Budget estimé</label>
    <select id="budget" name="budget">
      <option value="< 5000€">&lt; 5 000€</option>
      <option value="5000-10000€">5 000€ - 10 000€</option>
      <option value="10000-25000€">10 000€ - 25 000€</option>
      <option value="> 25000€">&gt; 25 000€</option>
    </select>
  </div>
  <div>
    <label for="description">Description du projet</label>
    <textarea id="description" name="description" required></textarea>
  </div>
  <div>
    <label for="cahier_charges">Cahier des charges (optionnel)</label>
    <input
      type="file"
      id="cahier_charges"
      name="cahier_charges"
      accept=".pdf,.doc,.docx"
    />
  </div>
  <button type="submit">Demander un devis</button>
</form>

<script>
  document
    .getElementById("devis-form")
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

      if (response.ok) {
        alert("Demande de devis envoyée !");
        e.target.reset();
      }
    });
</script>
```

## Points importants

- Remplacez `VOTRE_CODE` par le code unique de votre formulaire
- Remplacez `VOTRE_TOKEN_JWT` par le token généré dans le dashboard
- Remplacez `votre-puna.com` par l'URL de votre instance Puna
- Les noms des champs (`name`) correspondent aux clés qui apparaîtront dans l'inbox
