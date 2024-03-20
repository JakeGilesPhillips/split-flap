

"use client"
import { memo } from "react";
import { LeaderboardEntry as Entry } from "../contentful/routes/LeaderboardEntry";

interface LeaderboardEntryProps {
  index: number;
  entry: Entry;
}
const LeaderboardEntry = memo(({ index, entry }: LeaderboardEntryProps) => {
  const primary = index == 0;
  const fontSize = primary ? 32 : index >= 10 ? 24 : 26;
  const opacity = index >= 10 ? 0.8 : 1;
  const fontWeight = primary ? "bold" : "medium";

  return (
    <div className="flex flex-row justify-center items-center w-full text-solarwinds gap-4" style={{ opacity }}>
      <span style={{ fontSize, fontWeight }}>{index + 1}</span>
      <div className="flex flex-row justify-between items-center w-full bg-solarwinds rounded-lg p-6 text-white">
        <span style={{ fontSize, fontWeight }}>{entry.name}</span>
        <span style={{ fontSize, fontWeight }}>{entry.score}</span>
      </div>
    </div>
  )
});

LeaderboardEntry.displayName = 'LeaderboardEntry';
export default LeaderboardEntry;