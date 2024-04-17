"use client"
import Image from "next/image";
import Logo from '../../../public/PYTCHLogo.png';
import Pattern from '../../../public/PYTCHBackground.jpeg';
import { useInterval } from "../hooks/useInterval";
import LeaderboardEntry from "./LeaderboardEntry";
import { LeaderboardEntry as Entry } from "../contentful/routes/LeaderboardEntry";
import { ParseJson, fetchLeaderboard } from "../helpers/ServerHelper";
import { useState } from "react";

interface LeaderboardProps {
  initialScores: Entry[];
}

const Leaderboard = ({ initialScores }: LeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<Entry[]>(initialScores);

  const getScores = async () => {
    const _leaderboard = await fetchLeaderboard();
    const json = await ParseJson(_leaderboard);
    if (!json || json?.length <= 0) return;
    setLeaderboard(json);
  };

  useInterval(() => {
    getScores();
  }, 5000);


  return (<div className="relative flex flex-col justify-start items-center min-w-screen min-h-screen mono bg-black text-white border">
    <Image src={Pattern} fill objectFit="cover" alt="" className="absolute z-10 top-0 left-0 w-full h-full opacity-[90%]" />
    <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-full w-full p-8 z-20">
      <div className="relative flex flex-col justify-center items-center w-full px-16 items-start">
        <Image className="relative z-20" src={Logo} alt="" height={100} objectFit="contain" />
      </div>
      <span className="px-4 text-[22pt] font-bold">FLIGHT SIMULATOR CHALLENGE</span>
      <span className="px-4 pt-2 text-[16pt]">GET THE BEST SCORE ON THE LANDING TRAINING</span>
      <div className="relative z-50 flex flex-col w-full h-full mt-8 p-4 bg-white/25 overflow-hidden rounded-xl shadow-[inset_0_0px_8px_rgba(0,0,0,0.2)] gap-4">
        {leaderboard.map((a, i) => (
          <LeaderboardEntry key={i} index={i} entry={a} />
        ))}
      </div>
    </div>
  </div>)

}

export default Leaderboard;