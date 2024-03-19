/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { memo, useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { useAnimate, motion } from "framer-motion";
import { useSchedule } from "../contexts/ScheduleContext";
import { GetAlColumnRowsFromScheduleByKey, arraysEqual, timeout } from "../helpers/DataHelper";

export interface SplitFlapStringProps {
  smoothAnim?: boolean;
  columnKey?: string;
  targetString?: string;
  maxLength?: number;
  date?: boolean;
  presetWords?: string[];
}

const SplitFlapString = memo(({ smoothAnim = true, columnKey = "", targetString = "", maxLength = 10, date = false, presetWords }: SplitFlapStringProps) => {
  const { schedule } = useSchedule();

  useEffect(() => {
    if (presetWords || !schedule) return;
    const _words = GetAlColumnRowsFromScheduleByKey(columnKey, schedule, date);
    if (!arraysEqual(_words, words)) {
      setWords(_words);
    }
  }, [date]);

  // Set flap animations
  const [oldFlap, animateOldFlap] = useAnimate();
  const [newFlap, animateNewFlap] = useAnimate();

  // Set animation characters
  const [words, setWords] = useState<string[]>(presetWords ?? []);
  const [oldString, setOldString] = useState<string>("");
  const [newString, setNewString] = useState<string>("");
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (words.length == 0) return;
    setOldString(words[0]);
    setNewString(words[1]);
  }, [words]);

  useEffect(() => {
    _animate();
  }, [targetString, newString]);

  const _animate = () => {
    if (targetString == oldString || animating) return;
    animate();
  }

  // Check settings exist first
  const { settings } = useSettings();
  if (!settings) return <></>;
  const { finalSpeed, rowHeight, rowFontSize } = settings;

  const animate = async () => {
    setAnimating(true);
    const oldIndex = words.indexOf(newString);
    const duration = finalSpeed || 0.15;

    if (smoothAnim) {
      await animateOldFlap(oldFlap.current, { rotateX: -90 }, { duration: duration * 0.5, ease: 'easeIn' });
      await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
      await animateNewFlap(newFlap.current, { rotateX: 0 }, { duration: duration * 0.5 });
    }


    if (newString) setOldString(newString || oldString || words[oldIndex]);

    if (smoothAnim) {
      await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
      await animateOldFlap(oldFlap.current, { rotateX: 0 }, { duration: 0, ease: 'easeIn' });
    } else {
      await timeout(100);
    }

    setNewString(words[oldIndex + 1]);
    setAnimating(false);
  }

  return (
    <div className="animated-string relative text-white w-full tracking-widest" style={{ height: (rowHeight || 1) * 2, width: (rowHeight || 1) * maxLength, fontSize: rowFontSize }}>
      <div id="TOP" className="absolute h-full w-full flex justify-center items-start" style={{ perspective: '400px' }}>
        <div id="TOP-FRONT" className="animating absolute w-full h-full z-10 will-change-transform" ref={oldFlap} style={{ transform: 'rotateX(0deg)' }}>
          <div className="relative h-[50%] w-full flex justify-start items-start overflow-hidden bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-start items-center px-3">
              <span>{oldString?.replaceAll('AND', '&')}</span>
            </div>
          </div>
        </div>

        <div id="TOP-REAR" className="absolute w-full h-full">
          <div className="relative h-[50%] w-full flex justify-start items-start overflow-hidden bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-start items-center px-3">
              <span>{newString?.replaceAll('AND', '&')}</span>
            </div>
          </div>
        </div>
      </div>


      <div id="BOTTOM" className="absolute mt-[1px] h-full w-full" style={{ perspective: '400px' }}>
        <div id="BOTTOM-FRONT" className="animating absolute w-full h-full flex items-end z-10 will-change-transform" ref={newFlap} style={{ transform: 'rotateX(90deg)' }}>
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%] bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-start items-center px-3">
              <span>{newString?.replaceAll('AND', '&')}</span>
            </div>
          </div>
        </div>

        <div id="BOTTOM-REAR" className="absolute w-full h-full flex items-end">
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%] bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-start items-center px-3">
              <span>{oldString?.replaceAll('AND', '&')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SplitFlapString.displayName = 'SplitFlapString';

export default SplitFlapString;