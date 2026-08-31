# Deployment

## Environment

Set `INFERENCE_API_URL` to the private FastAPI online-feature service URL and `DATABASE_URL` to the Postgres metadata database. Never expose either variable with a `NEXT_PUBLIC_` prefix.

## Vercel

1. Import this repository into Vercel.
2. Add environment variables for Preview and Production.
3. Deploy the Next.js application. Keep Python batch/stream workers and model artifacts on external managed compute and storage.

## Operational controls

- Validate all requests in Next.js and FastAPI routes.
- Use object storage for artifacts; serverless disk is not durable.
- Alert when a serving feature exceeds its freshness expectation.
- Gate model promotion on online/offline feature parity and point-in-time validation.
