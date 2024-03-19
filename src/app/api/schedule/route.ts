export const revalidate = 0;

export async function POST(req: Request) {
  const reqBody = await req.json();
  const params = new URLSearchParams(reqBody?.params || {}).toString();
  const response = await fetch('https://webapp-yarp-dab.azurewebsites.net/data-api/rest/GetMainScreenAgenda?' + params);
  const resBody = await response.json();

  return Response.json(resBody);
}