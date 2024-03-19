export const revalidate = 0;
import { fetchSettingsNew } from "@/app/contentful/routes/SettingsNew";

export async function POST(req: Request) {
  const body = await req.json();
  const settings = await fetchSettingsNew(body?.name);

  return Response.json(settings);
}

export async function GET() {
  const response = await fetch('https://webapp-yarp-dab.azurewebsites.net/data-api/rest/GetMainScreenAgenda');
  const body = await response.json();
  

  return Response.json(body);
}