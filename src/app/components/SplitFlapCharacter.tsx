/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CharacterType } from "../contentful/routes/SplitFlapEntry";

export interface SplitFlapCharacterProps {
  targetChar?: string;
  speed1?: number;
  speed2?: number;
  height?: number;
  fontSize?: number;
  type?: CharacterType;
}

const SplitFlapCharacter = ({ targetChar = "A", speed1 = 0.1, speed2 = 0.3, height = 50, fontSize = 28, type = 'ALPHANUMERIC' }: SplitFlapCharacterProps) => {
  const symbols = ["", ":", "&", "-"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const characters = type == 'ALPHABET' ? symbols.concat(alphabet) : type == 'NUMERIC' ? symbols.concat(numbers) : symbols.concat(alphabet.concat(numbers));

  const [oldFlap, animateOldFlap] = useAnimate();
  const [newFlap, animateNewFlap] = useAnimate();

  const [oldChar, setOldChar] = useState<string>(characters[0]);
  const [newChar, setNewChar] = useState<string>(characters[1]);

  const animate = async () => {
    const oldIndex = characters.indexOf(newChar?.trim());
    const curIndex = characters.indexOf(oldChar?.trim());
    const tarIndex = characters.indexOf(targetChar?.trim());
    const distance = Math.abs(tarIndex - curIndex);
    const duration = distance < 4 ? speed2 : speed1;

    // Perform flip 1
    await animateOldFlap(oldFlap.current, { rotateX: 90 }, { duration: duration * 0.5, ease: 'easeIn' });
    await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
    await animateNewFlap(newFlap.current, { rotateX: 0 }, { duration: duration * 0.5 });
    setOldChar(newChar);

    // Reset
    await animateOldFlap(oldFlap.current, { rotateX: 0 }, { duration: 0, ease: 'easeIn' });
    await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
    setNewChar(characters[oldIndex + 1]);
  }

  useEffect(() => {
    if (targetChar?.trim() == oldChar) return;
    animate();
  }, [targetChar, newChar]);

  return (
    <div className="relative bg-zinc-900 aspect-[9/14] text-white" style={{ height, fontSize }}>
      <div id="TOP" className="absolute h-full w-full flex justify-center items-start" style={{ perspective: '-200px' }}>
        <motion.div id="TOP-FRONT" className="absolute w-full h-full z-10 will-change-transform" ref={oldFlap} style={{ transform: 'rotateX(0deg)' }}>
          <div className="relative h-[50%] w-full bg-zinc-800 flex justify-start items-start overflow-hidden">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{oldChar}</span>
            </div>
          </div>
        </motion.div>

        <div id="TOP-REAR" className="absolute w-full h-full">
          <div className="relative h-[50%] w-full bg-neutral-800 flex justify-start items-start overflow-hidden">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{newChar}</span>
            </div>
          </div>
        </div>
      </div>


      <div id="BOTTOM" className="absolute mt-[1px] h-full w-full" style={{ perspective: '200px' }}>
        <motion.div id="BOTTOM-FRONT" className="absolute w-full h-full flex items-end z-10 will-change-transform" ref={newFlap} style={{ transform: 'rotateX(90deg)' }}>
          <div className="relative h-[50%] w-full bg-zinc-800 flex items-end overflow-hidden">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{newChar}</span>
            </div>
          </div>
        </motion.div>

        <div id="BOTTOM-REAR" className="absolute w-full h-full flex items-end">
          <div className="relative h-[50%] w-full bg-neutral-800 flex items-end overflow-hidden">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{oldChar}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitFlapCharacter;