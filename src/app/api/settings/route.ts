export const revalidate = 0;
import { fetchSettings } from "../../contentful/routes/Settings"

export async function POST(req: Request) {
  const body = await req.json();
  const settings = await fetchSettings(body?.name);

  return Response.json(settings);
}