# Feature jobs

This directory is reserved for batch transformations, stream consumers, and training code. Batch joins must use an entity key plus `event_timestamp <= label_timestamp`; never join with future events. Materialized tables and model artifacts belong in managed storage, not Vercel function disk.

The initial `feature_contract.yaml` captures entity ownership, expected freshness, validation limits, and offline/online store separation.
