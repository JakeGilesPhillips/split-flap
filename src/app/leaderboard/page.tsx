export const revalidate = 0;
import Image from "next/image";

import Logo from '../../../public/Solarwinds.png';
import Pattern from '../../../public/SolarwindsPattern.png';
import PatternOrange from '../../../public/SolarwindsPatternOrange.png';
import LeaderboardEntry from "../components/LeaderboardEntry";
import { fetchLeaderboardEntries } from "../contentful/routes/LeaderboardEntry";

const Leaderboard = async () => {
  const leaderboard = await fetchLeaderboardEntries();

  return (
    <main className="relative flex flex-col justify-start items-center min-w-screen min-h-screen mono bg-solarwinds text-white border">
      <Image src={Pattern} fill objectFit="contain" alt="" className="absolute top-0 left-0 w-full h-full opacity-[10%]" />
      <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-full w-full p-8">
        <div className="relative flex flex-col justify-start w-full h-[160px] px-16 items-start">
          <Image className="relative" src={Logo} alt="" height={200} objectFit="contain" />
        </div>
        <span className="px-4 text-[30pt] font-bold">FLIGHT SIMULATOR CHALLENGE</span>
        <span className="px-4 text-[25pt] font-medium">Can you get into our top 10?</span>
        <div className="flex flex-col w-full h-full mt-8 p-8 bg-white overflow-hidden rounded-xl shadow-[inset_0_0px_8px_rgba(0,0,0,0.2)] gap-4">
          <Image src={PatternOrange} fill objectFit="contain" alt="" className="absolute top-0 left-0 w-full h-full opacity-[10%]" />
          {leaderboard.map((a, i) => (
            <LeaderboardEntry key={i} index={i} entry={a} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Leaderboard;