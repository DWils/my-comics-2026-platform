# Architecture — Comics Streaming Platform

Living document, updated as decisions are made throughout the mentoring sessions. Last updated: Module 5.

## Overview

Netflix-style comics streaming platform. Microservices architecture, synchronous communication (REST) for direct requests, asynchronous communication (Kafka) for inter-service events.

## Microservices list

### user-service (in place)
User accounts, authentication (JWT), profile management.
Status: Modules 1 to 4 completed (CRUD, BCrypt+JWT security, validation, tests).

### catalogueService
Comics metadata: titles, authors, genres, series, chapter lists, descriptions.
Includes, for now, the recommendation logic (decision: avoid service sprawl until the real need is there — to be revisited if the recommendation algorithm grows more complex or needs its own behavioral data).

### mediaService
Storage and delivery of raw files (comic pages/images), via MinIO/S3. Has no knowledge of business metadata, only files and their identifiers.

### publishService
Creation tool for authors/editors: WYSIWYG editing or PDF import/splitting into pages. Once a chapter is finalized, publishes a Kafka event (`chapter.published`) so other services can react, instead of direct HTTP calls (decoupling).

### paymentService
User subscriptions and payments.

## Kafka — infrastructure, not a service

Kafka is not a microservice with its own business logic: it's the event bus used by the other services to communicate asynchronously and in a decoupled way. First identified topic: `chapter.published`, emitted by `publishService`, consumed by `catalogueService` (and `mediaService` if needed).

## Deferred decisions (deliberately, not forgotten)

- **notificationService**: would listen to Kafka events (e.g. `chapter.published`) to notify subscribed users (email/push). Deferred — premature until the basic Kafka foundation exists.
- **Decoupling recommendation from catalogue**: to be revisited if recommendation logic grows or needs dedicated behavioral data.

## Text diagram (simplified view)

```
                        ┌─────────────┐
                        │   Kafka     │  (event bus)
                        └──────┬──────┘
                 chapter.published │
        ┌───────────────┬────────┴────────┬───────────────┐
        │                │                 │               │
┌───────▼──────┐ ┌───────▼──────┐ ┌────────▼─────┐ ┌───────▼──────┐
│ publishService│ │catalogueServ.│ │ mediaService │ │ (future)     │
│  (creation)   │ │ (metadata    │ │  (files,     │ │notificationSv│
│               │ │ + reco)      │ │  MinIO/S3)   │ │              │
└───────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

┌───────────────┐                                    ┌──────────────┐
│  user-service │  (accounts, JWT auth)               │paymentService│
└───────────────┘                                    └──────────────┘
```

## Completed modules history

1. user-service — Core CRUD & model ✅
2. user-service — Security (BCrypt + JWT) ✅
3. user-service — Validation & error handling ✅
4. user-service — Unit & integration tests ✅
5. Overall platform architecture ✅ (this document)
