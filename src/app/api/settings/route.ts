export const revalidate = 0;

import { fetchSettings } from "../../contentful/routes/Settings"

export async function GET() {
  const settings = await fetchSettings();
  return Response.json(settings);
}