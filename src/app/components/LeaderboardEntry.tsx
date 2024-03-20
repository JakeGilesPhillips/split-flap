

"use client"
import { memo } from "react";
import { LeaderboardEntry as Entry } from "../contentful/routes/LeaderboardEntry";

interface LeaderboardEntryProps {
  index: number;
  entry: Entry;
}
const LeaderboardEntry = memo(({ index, entry }: LeaderboardEntryProps) => {
  const primary = index == 0;
  const fontSize = primary ? 62 : index >= 10 ? 40 : 45;
  const opacity = index >= 10 ? 0.7 : 1;
  const fontWeight = primary ? "bold" : "light";

  return (
    <div className="flex flex-row justify-center items-center w-full p-4 text-solarwinds gap-6" style={{ opacity }}>
      <span className="mr-10" style={{ fontSize, fontWeight }}>{index + 1}</span>
      <div className="flex flex-row justify-between items-center w-full bg-solarwinds rounded-xl p-10 py-12 text-white">
        <span style={{ fontSize, fontWeight }}>{entry.name}</span>
        <span style={{ fontSize, fontWeight }}>{entry.score}</span>
      </div>
    </div>
  )
});

LeaderboardEntry.displayName = 'LeaderboardEntry';
export default LeaderboardEntry;