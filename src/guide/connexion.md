---
title: Connexion & authentification
---

# Connexion & authentification

## Connexion standard

L'accès à Puna se fait via un formulaire login / mot de passe. Les sessions sont persistantes jusqu'à expiration (12 heures par défaut, configurable via `SESSION_MAX_AGE`).

## Authentification à deux facteurs (2FA TOTP)

La 2FA TOTP est disponible si `TOTP_ENABLED=true` dans la [Configuration](../demarrage/configuration.md).

**Activation** :

1. Aller dans [Profil](./profil.md) → section 2FA.
2. Scanner le QR code avec une application TOTP (Google Authenticator, Authy, etc.).
3. Confirmer avec un code à 6 chiffres pour valider l'activation.

L'émetteur affiché dans l'application TOTP est configurable via la variable `TOTP_ISSUER` (défaut : `Puna`).

## Réinitialisation du mot de passe

Un lien de réinitialisation est envoyé par email à l'adresse associée au compte. Cette fonctionnalité nécessite un serveur SMTP configuré (variables `SMTP_*`). Si SMTP n'est pas configuré, la réinitialisation est silencieusement désactivée.

## Durée de session

La session reste active jusqu'à `SESSION_MAX_AGE` millisecondes après la dernière activité (12 heures par défaut). Elle est stockée en base de données.
