import { LeaderboardEntry, fetchLeaderboardEntries, postLeaderboardEntry } from "@/app/contentful/routes/LeaderboardEntry";

export const revalidate = 0;

export async function GET() {
  const response = await fetchLeaderboardEntries();
  return Response.json(response);
}

export async function POST(req: any) {
  const reqBody = await req.json();
  const body: LeaderboardEntry = {
    ...reqBody,
    score: parseInt(reqBody.score)
  }
  const response = await postLeaderboardEntry(body);
  return Response.json({ success: response });
}