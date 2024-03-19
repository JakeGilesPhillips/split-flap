/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { memo, useEffect, useMemo, useState } from "react";
import SplitFlapCharacter from "./SplitFlapCharacter";
import SplitFlapStaticCharacter from "./SplitFlapStaticCharacter";
import { useSettings } from "../contexts/SettingsContext";
import { CharacterType } from "../contentful/routes/SplitFlapColumn";
import SplitFlapString from "./SplitFlapString";
import { format } from "date-fns";


const SplitFlapClock = memo(() => {
  const { settings } = useSettings();


  const [time, setTime] = useState<Date>(new Date());
  const characters = useMemo(() => {
    return format(time, 'kk:mm:ss');
  }, [time]);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 900);
    return () => clearInterval(intervalId);
  }, []);

  // Skip if no settings
  if (!settings) return <></>;

  // Return character
  return (
    <div className="flex flex-row items-center justify-center gap-2 p-2" >
      {new Array(characters.length).fill('')?.map((a, i) => {
        return <SplitFlapStaticCharacter key={i} targetChar={characters[i]} />
      })}
    </div>
  )
});

SplitFlapClock.displayName = 'SplitFlapClock'
export default SplitFlapClock;