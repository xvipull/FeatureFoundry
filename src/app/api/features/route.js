import { features, registerFeature } from "../../../lib/feature-data";

const namePattern = /^[a-z][a-z0-9_]{2,63}$/;
const requiredTextFields = ["entity", "version", "owner", "source", "description"];

export function GET(request) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (query.length > 80) return error("INVALID_QUERY", "Search query must be 80 characters or fewer.");
  const result = query ? features.filter((feature) => `${feature.name} ${feature.entity} ${feature.owner}`.toLowerCase().includes(query)) : features;
  return Response.json({ data: result, meta: { total: result.length } });
}

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return error("INVALID_JSON", "Send a valid JSON feature definition."); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return error("INVALID_PAYLOAD", "Feature definition must be an object.");
  const name = typeof body.name === "string" ? body.name.trim().toLowerCase() : "";
  if (!namePattern.test(name)) return error("INVALID_NAME", "Use a lowercase feature name with letters, numbers, and underscores (3-64 characters).");
  const fields = Object.fromEntries(requiredTextFields.map((field) => [field, typeof body[field] === "string" ? body[field].trim() : ""]));
  for (const field of requiredTextFields) if (!fields[field] || fields[field].length > 160) return error("INVALID_FIELD", `${field} is required and must be 160 characters or fewer.`);
  const freshnessMinutes = body.freshnessMinutes;
  if (!Number.isInteger(freshnessMinutes) || freshnessMinutes < 1 || freshnessMinutes > 10080) return error("INVALID_FRESHNESS", "Freshness expectation must be a whole number from 1 to 10,080 minutes.");
  if (features.some((feature) => feature.name === name)) return error("DUPLICATE_FEATURE", "A feature with this name is already registered.", 409);
  return Response.json({ data: registerFeature({ name, ...fields, freshnessMinutes }) }, { status: 201 });
}

function error(code, message, status = 400) { return Response.json({ error: { code, message } }, { status }); }
