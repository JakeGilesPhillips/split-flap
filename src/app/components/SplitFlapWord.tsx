/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { memo, use, useEffect, useMemo, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { useSettings } from "../contexts/SettingsContext";
import { useSchedule } from "../contexts/ScheduleContext";
import { CharacterType } from "../contentful/routes/SplitFlapColumn";
import { GetColumnFromScheduleByKey } from "../helpers/DataHelper";
import SplitFlapCharacter from "./SplitFlapCharacter";
import SplitFlapString from "./SplitFlapString";

export interface SplitFlapWordProps {
  rowIndex?: number;
  columnName?: string;
  columnKey?: string;
  maxLength?: number;
  animated?: boolean;
  justify?: string;
  type?: CharacterType;
  date?: boolean;
  words?: string[];
}

const SplitFlapWord = memo((props: SplitFlapWordProps) => {
  const { rowIndex = 0, columnKey = '', columnName = '', maxLength = 10, animated = true, justify = 'start', type = 'ALPHANUMERIC', date = false, words } = props;
  const { schedule, getPage, page1, page2, page3 } = useSchedule();
  const { settings } = useSettings();

  const [targetWord, setTargetWord] = useState<string>("");

  const characters: string[] = useMemo(() => {
    return new Array(maxLength).fill('');
  }, [maxLength]);

  // Check word and asign if different
  const checkWord = () => {
    const page = getPage(rowIndex);
    const word = GetColumnFromScheduleByKey(columnKey, schedule[page], date).toUpperCase();
    if (word != targetWord) setTargetWord(word.replaceAll('AND', '&'));
  }

  // Check word everytime the page changes
  useEffect(() => {
    checkWord();
  }, [page1, page2, page3])

  // Skip if nothing to return
  if (!settings) return <></>;

  // Return character
  return (
    <div className="flex flex-col gap-0 text-white m-0">
      <span className="pl-2 text-sql-yellow" style={{ fontSize: (settings.rowFontSize ?? 20) + 4 }}>{columnName || "‎"}</span>
      {type == 'WORD' ? (
        <div className="flex flex-row gap-2 p-2">
          <SplitFlapString targetString={targetWord} columnKey={columnKey} smoothAnim={animated} maxLength={maxLength} date={date} presetWords={words} />
        </div>
      ) : (
        <div className={`flex flex-row flex-wrap justify-${justify} w-full gap-2 p-2`}>
          {characters.map((a, i) => (
            <SplitFlapCharacter key={i} targetChar={targetWord[i]?.trim()} smoothAnim={animated} type={type} />
          ))}
        </div>
      )}
    </div>
  )
});

SplitFlapWord.displayName = 'SplitFlapWord'
export default SplitFlapWord;