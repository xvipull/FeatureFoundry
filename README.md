# FeatureFoundry

FeatureFoundry is a feature-store operations console for a customer-churn use case. It makes feature freshness, data-quality checks, feature definitions, and model dependencies visible before stale or invalid values affect production serving.

## Live demo

https://featurefoundry-three.vercel.app

## Architecture

```text
Event sources -> Python batch / stream jobs -> Postgres offline store
                                             -> Feature registry metadata
                                             -> Redis online store -> FastAPI serving API
Next.js operations UI -> Next.js API routes -> registry / serving service
```

The browser communicates only with Next.js routes. Credentials and external service URLs remain server-side environment variables.

## Current scope

- Operations dashboard with feature registry, freshness warnings, quality checks, and model dependencies.
- Typed API routes with structured validation errors.
- Churn-domain feature contract with entities, versions, quality limits, and store definitions.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The dashboard currently uses representative registry data; its API contracts are ready to be connected to Postgres and the online feature service.

## Data and model notes

Point-in-time correctness is mandatory: training data may only use feature events timestamped on or before the label timestamp. Training runs should persist the exact feature versions, materialization timestamp, data window, and evaluation metrics. Online/offline parity tests must compare values for a fixed entity and event time.

## Limitations

This starter does not yet provision Postgres, Redis, FastAPI, or a scheduled materialization worker. It intentionally contains no customer data or trained-model claims.
