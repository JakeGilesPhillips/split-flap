/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { memo, useEffect, useState } from "react";
import { CharacterType } from "../contentful/routes/SplitFlapColumn";
import { useSettings } from "../contexts/SettingsContext";
import { useAnimate } from "framer-motion";
import waitUntil from "async-wait-until";
import { timeout } from "../helpers/DataHelper";

export interface SplitFlapCharacterProps {
  targetChar?: string;
  smoothAnim?: boolean;
  type?: CharacterType;
}

const SplitFlapCharacter = memo(({ targetChar = '', smoothAnim = false, type = 'ALPHANUMERIC' }: SplitFlapCharacterProps) => {
  const symbols = ["", ":", "&", "-", "–", ",", "'", "?", "!", "(", ")"];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const characters = type == 'ALPHABET' ? symbols.concat(alphabet) : type == 'NUMERIC' ? symbols.concat(numbers) : symbols.concat(alphabet.concat(numbers));

  // Set flap animations
  const [oldFlap, animateOldFlap] = useAnimate();
  const [newFlap, animateNewFlap] = useAnimate();

  // Set animation characters
  const [animating, setAnimating] = useState<boolean>(false);
  const [oldChar, setOldChar] = useState<string>(characters[0]);
  const [newChar, setNewChar] = useState<string>(characters[1]);

  // Start animation when targetChar changes
  useEffect(() => {
    _animate();
  }, [targetChar, newChar]);

  const _animate = () => {
    if (targetChar == oldChar || animating) return;
    animate();
  }

  // Check settings exist first
  const { settings } = useSettings();
  if (!settings) return <></>;
  const { rowHeight, rowFontSize } = settings;

  // Animate the character
  const animate = async () => {
    setAnimating(true);
    const oldIndex = characters.indexOf(newChar?.trim());
    const duration = 0.1;

    if (smoothAnim) {
      await animateOldFlap(oldFlap.current, { rotateX: -90 }, { duration: duration * 0.5, ease: 'easeIn' });
      await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
      await animateNewFlap(newFlap.current, { rotateX: 0 }, { duration: duration * 0.5 });
    }

    setOldChar(newChar);

    if (smoothAnim) {
      await animateNewFlap(newFlap.current, { rotateX: 90 }, { duration: 0 });
      await animateOldFlap(oldFlap.current, { rotateX: 0 }, { duration: 0, ease: 'easeIn' });
    } else {
      await timeout(100);
    }

    setNewChar(characters[oldIndex + 1]);
    setAnimating(false);
  }

  return (
    <div className="animated-character relative aspect-[3/2.8] text-white" style={{ height: rowHeight, fontSize: rowFontSize }}>
      <div id="TOP" className="absolute h-full w-full flex justify-center items-start" style={{ perspective: '400px' }}>
        <div id="TOP-FRONT" className="animating absolute w-full h-full z-10 will-change-transform" ref={oldFlap} style={{ transform: 'rotateX(0deg)' }}>
          <div className="relative h-[50%] w-full flex justify-start items-start overflow-hidden bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{oldChar}</span>
            </div>
          </div>
        </div>

        <div id="TOP-REAR" className="absolute w-full h-full">
          <div className="relative h-[50%] w-fulgl flex justify-start items-start overflow-hidden bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{newChar}</span>
            </div>
          </div>
        </div>
      </div>


      <div id="BOTTOM" className="absolute mt-[1px] h-full w-full" style={{ perspective: '400px' }}>
        <div id="BOTTOM-FRONT" className="animating absolute w-full h-full flex items-end z-10 will-change-transform" ref={newFlap} style={{ transform: 'rotateX(90deg)' }}>
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%] bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{newChar}</span>
            </div>
          </div>
        </div>

        <div id="BOTTOM-REAR" className="absolute w-full h-full flex items-end">
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%] bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{oldChar}</span>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
});

SplitFlapCharacter.displayName = 'SplitFlapCharacter';

export default SplitFlapCharacter;