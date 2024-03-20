export const revalidate = 0;
import Leaderboard from "../components/Leaderboard";
import { fetchLeaderboardEntries } from "../contentful/routes/LeaderboardEntry";

const LeaderboardPage = async () => {
  const initialScores = await fetchLeaderboardEntries();

  return (
    <main className="min-w-screen min-h-screen">
      <Leaderboard initialScores={initialScores} />
    </main>
  );
}

export default LeaderboardPage;