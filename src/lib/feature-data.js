export const features = [
  { name: "customer_30d_spend", entity: "customer", version: "v3", freshness: "12 min ago", freshnessMinutes: 12, quality: "Passed", owner: "Growth ML", source: "orders_stream", description: "Rolling 30-day completed order value." },
  { name: "customer_7d_sessions", entity: "customer", version: "v2", freshness: "4 min ago", freshnessMinutes: 4, quality: "Passed", owner: "Product Data", source: "events_stream", description: "Distinct sessions in the seven-day observation window." },
  { name: "payment_failure_rate", entity: "customer", version: "v4", freshness: "47 min ago", freshnessMinutes: 47, quality: "Warning", owner: "Risk ML", source: "payments_batch", description: "Failed payment attempts divided by all recent payment attempts." },
  { name: "support_ticket_count_14d", entity: "customer", version: "v1", freshness: "18 min ago", freshnessMinutes: 18, quality: "Passed", owner: "CX Analytics", source: "support_batch", description: "Customer-created support tickets in the prior fourteen days." },
  { name: "plan_tier", entity: "customer", version: "v1", freshness: "2 min ago", freshnessMinutes: 2, quality: "Passed", owner: "Billing", source: "billing_stream", description: "Current subscription tier, normalized from billing events." }
];

export function registerFeature(input) {
  const feature = { ...input, freshness: "Just registered", quality: "Passed" };
  features.unshift(feature);
  return feature;
}

export const overview = {
  registeredFeatures: 42, healthyFeatures: 38, staleFeatures: 2, trainingRuns: 16,
  dependencies: [
    { model: "churn-risk-model", version: "2025.02", features: 18, status: "Serving" },
    { model: "retention-uplift", version: "2025.01", features: 12, status: "Candidate" },
    { model: "winback-ranking", version: "2024.12", features: 9, status: "Archived" }
  ]
};
