# Architecture — Comics Streaming Platform

Document vivant, mis à jour au fil des décisions prises pendant le mentorat. Dernière mise à jour : Module 5.

## Vue d'ensemble

Plateforme de streaming de comics façon Netflix. Architecture en microservices, communication synchrone (REST) pour les requêtes directes, communication asynchrone (Kafka) pour les événements inter-services.

## Liste des microservices

### user-service (en place)
Comptes utilisateurs, authentification (JWT), gestion des profils.
Statut : Modules 1 à 4 terminés (CRUD, sécurité BCrypt+JWT, validation, tests).

### catalogueService
Métadonnées des comics : titres, auteurs, genres, séries, liste des chapitres, descriptions.
Inclut, pour l'instant, la logique de recommandation (décision : éviter la prolifération de services tant que le besoin réel n'est pas là — à réévaluer si l'algorithme de recommandation devient complexe ou nécessite ses propres données comportementales).

### mediaService
Stockage et distribution des fichiers bruts (pages/images des comics), via MinIO/S3. Ne connaît aucune métadonnée métier, uniquement les fichiers et leurs identifiants.

### publishService
Outil de création pour les auteurs/éditeurs : édition WYSIWYG ou import/découpage de PDF en pages. Une fois un chapitre finalisé, publie un événement Kafka (`chapter.published`) pour que les autres services réagissent, plutôt que des appels HTTP directs (découplage).

### paymentService
Abonnements et paiements des utilisateurs.

## Kafka — infrastructure, pas un service

Kafka n'est pas un microservice avec sa propre logique métier : c'est le bus d'événements utilisé par les autres services pour communiquer de façon asynchrone et découplée. Premier topic identifié : `chapter.published`, émis par `publishService`, consommé par `catalogueService` (et `mediaService` si besoin).

## Décisions différées (volontairement, pas oubliées)

- **notificationService** : écouterait les événements Kafka (ex: `chapter.published`) pour notifier les utilisateurs abonnés (email/push). Reporté — prématuré tant que le socle Kafka de base n'existe pas.
- **Découplage recommandation/catalogue** : à revisiter si la logique de recommandation grossit ou nécessite des données comportementales dédiées.

## Schéma texte (vue simplifiée)

```
                        ┌─────────────┐
                        │   Kafka     │  (bus d'événements)
                        └──────┬──────┘
                 chapter.published │
        ┌───────────────┬────────┴────────┬───────────────┐
        │                │                 │               │
┌───────▼──────┐ ┌───────▼──────┐ ┌────────▼─────┐ ┌───────▼──────┐
│ publishService│ │catalogueServ.│ │ mediaService │ │ (futur)      │
│  (création)   │ │ (métadonnées │ │  (fichiers,  │ │notificationSv│
│               │ │ + reco)      │ │  MinIO/S3)   │ │              │
└───────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

┌───────────────┐                                    ┌──────────────┐
│  user-service │  (comptes, auth JWT)                │paymentService│
└───────────────┘                                    └──────────────┘
```

## Historique des modules réalisés

1. user-service — CRUD & modèle de base ✅
2. user-service — Sécurité (BCrypt + JWT) ✅
3. user-service — Validation & gestion d'erreurs ✅
4. user-service — Tests unitaires & intégration ✅
5. Architecture globale de la plateforme ✅ (ce document)
