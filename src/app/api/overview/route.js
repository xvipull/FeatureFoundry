import { overview } from "../../../lib/feature-data";
export function GET() { return Response.json({ data: overview }); }
