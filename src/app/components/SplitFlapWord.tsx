/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useAnimate, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { CharacterType } from "../contentful/routes/SplitFlapColumn";

export interface SplitFlapWordProps {
  targetWord?: string;
  targetColor?: string;
  speed1?: number;
  height?: number;
  width?: number;
  fontSize?: number;
}

const SplitFlapWord = ({ targetWord = "TEST", targetColor, speed1 = 0.1, height = 50, width = 100, fontSize = 28 }: SplitFlapWordProps) => {
  const zinc = "#27272a";

  const [oldFlap, animateOldFlap] = useAnimate();
  const [newFlap, animateNewFlap] = useAnimate();

  const [oldColor, setOldColor] = useState<string>(zinc);
  const [newColor, setNewColor] = useState<string>(zinc);

  const [oldWord, setOldWord] = useState<string>(targetWord);
  const [newWord, setNewWord] = useState<string>(targetWord);


  const animate = async () => {
    // Set next word & color
    setNewWord(targetWord);
    setNewColor(targetColor || zinc);

    // Perform flip 1
    await animateOldFlap(oldFlap.current, { rotateX: -90 }, { duration: speed1 * 0.5, ease: 'easeIn' });
    await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
    await animateNewFlap(newFlap.current, { rotateX: 0 }, { duration: speed1 * 0.5 });

    // Set old word & color
    setOldWord(targetWord);
    setOldColor(targetColor || zinc);

    // Reset
    await animateOldFlap(oldFlap.current, { rotateX: 0 }, { duration: 0, ease: 'easeIn' });
    await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
  }

  // Update word
  useEffect(() => {
    if (targetWord == oldWord) return;
    animate();
  }, [targetWord, oldWord]);

  // Update color
  useEffect(() => {
    if (targetColor == oldColor) return;
    animate();
  }, [targetColor, oldColor]);

  return (
    <div className="relative bg-zinc-900 text-white text-center" style={{ height, fontSize, width }}>
      <div id="TOP" className="absolute h-full w-full flex justify-center items-start" style={{ perspective: '400px' }}>
        <motion.div id="TOP-FRONT" className="absolute w-full h-full z-10 will-change-transform" ref={oldFlap} style={{ transform: 'rotateX(0deg)' }}>
          <div className="relative h-[50%] w-full flex justify-start items-start overflow-hidden" style={{ backgroundColor: oldColor }}>
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{oldWord}</span>
            </div>
          </div>
        </motion.div>

        <div id="TOP-REAR" className="absolute w-full h-full">
          <div className="relative h-[50%] w-full flex justify-start items-start overflow-hidden" style={{ backgroundColor: newColor }}>
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{newWord}</span>
            </div>
          </div>
        </div>
      </div>


      <div id="BOTTOM" className="absolute mt-[1px] h-full w-full" style={{ perspective: '400px' }}>
        <motion.div id="BOTTOM-FRONT" className="absolute w-full h-full flex items-end z-10 will-change-transform" ref={newFlap} style={{ transform: 'rotateX(90deg)' }}>
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%]" style={{ backgroundColor: newColor }}>
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{newWord}</span>
            </div>
          </div>
        </motion.div>

        <div id="BOTTOM-REAR" className="absolute w-full h-full flex items-end">
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%]" style={{ backgroundColor: oldColor }}>
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{oldWord}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitFlapWord;