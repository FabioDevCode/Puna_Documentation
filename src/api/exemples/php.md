---
title: Exemples PHP (cURL)
---

# Exemples PHP (cURL)

::: warning Appel depuis un serveur uniquement
Les credentials (`X-KEY-PUNA`, token JWT) ne doivent **jamais** être exposés dans du code côté client. Ces exemples sont destinés à être exécutés depuis un **backend PHP**.

Pour obtenir les valeurs nécessaires, voir [Authentification](../authentification.md).
:::

## Exemple 1 — Envoi JSON

```php
<?php

// Valeurs à récupérer depuis :
// - API_KEY du .env  → header X-KEY-PUNA
// - Vue "API" du site → Authorization Bearer
// - Vue "API" du formulaire → code dans l'URL
$punaApiKey   = 'gk_prod_7f3a2b9c';
$punaSiteToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImNjIjoiYWJjMTIzIn0.SIGNATURE';
$formCode     = 'contact_acme_corp';

$payload = json_encode([
    'nom'     => 'Alice Martin',
    'email'   => 'alice@example.com',
    'message' => 'Bonjour, je souhaite obtenir un devis.',
]);

$ch = curl_init("https://votre-puna.example.com/api/v1/send/{$formCode}");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        "X-KEY-PUNA: {$punaApiKey}",
        "Authorization: Bearer {$punaSiteToken}",
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    $error = json_decode($response, true);
    throw new RuntimeException("Erreur Puna {$httpCode}: " . ($error['error'] ?? 'Inconnue'));
}

$result = json_decode($response, true);
// ['success' => true]
```

## Exemple 2 — Envoi Multipart avec fichier joint

```php
<?php

$punaApiKey    = 'gk_prod_7f3a2b9c';
$punaSiteToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaXRlSWQiOjEsImNjIjoiYWJjMTIzIn0.SIGNATURE';
$formCode      = 'devis_acme_corp';
$filePath      = '/chemin/vers/devis_projet.pdf';

$postFields = [
    'nom'      => 'Bob Dupont',
    'email'    => 'bob@example.com',
    'message'  => 'Voir document joint.',
    'document' => new CURLFile($filePath, 'application/pdf', basename($filePath)),
];

$ch = curl_init("https://votre-puna.example.com/api/v1/send/{$formCode}");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $postFields,
    CURLOPT_HTTPHEADER     => [
        // Ne pas définir Content-Type manuellement — cURL le fait automatiquement avec le boundary
        "X-KEY-PUNA: {$punaApiKey}",
        "Authorization: Bearer {$punaSiteToken}",
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    $error = json_decode($response, true);
    throw new RuntimeException("Erreur Puna {$httpCode}: " . ($error['error'] ?? 'Inconnue'));
}

$result = json_decode($response, true);
// ['success' => true]
```
