

"use client"
import { memo } from "react";
import { LeaderboardEntry as Entry } from "../contentful/routes/LeaderboardEntry";
import { capitalize } from "../helpers/DataHelper";

interface LeaderboardEntryProps {
  index: number;
  entry: Entry;
}
const LeaderboardEntry = memo(({ index, entry }: LeaderboardEntryProps) => {
  const primary = index == 0;
  const fontSize = primary ? 26 : index >= 10 ? 20 : 22;
  const opacity = index >= 10 ? ((17 - index)) / 10 : 1;
  const fontWeight = primary ? "bold" : "light";

  return (
    <div className="flex flex-row justify-center items-center w-full p-4 text-white gap-6" style={{ opacity }}>
      <span className="mr-10 w-[8%] text-center" style={{ fontSize: fontSize + 8, fontWeight }}>{index + 1}</span>
      <div className="flex flex-row justify-between items-center w-full bg-black rounded-xl p-10 py-4 text-white">
        <span style={{ fontSize, fontWeight }}>{capitalize(entry?.name || "")}</span>
        <span style={{ fontSize, fontWeight }}>{entry.score}</span>
      </div>
    </div>
  )
});

LeaderboardEntry.displayName = 'LeaderboardEntry';
export default LeaderboardEntry;