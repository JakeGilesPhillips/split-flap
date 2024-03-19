/* eslint-disable react-hooks/exhaustive-deps */
import { useSettings } from "../contexts/SettingsContext";

export interface SplitFlapStaticCharacterProps {
  targetChar?: string;
}

const SplitFlapStaticCharacter = ({ targetChar = "" }: SplitFlapStaticCharacterProps) => {
  const { settings } = useSettings();
  if (!settings) return <></>;

  const { rowHeight, rowFontSize } = settings;

  return (
    <div className="static-character relative aspect-[9/14] text-white text-center" style={{ height: rowHeight, fontSize: rowFontSize }}>
      <div id="TOP" className="absolute h-full w-full flex justify-center items-start">
        <div id="TOP-FRONT" className="absolute w-full h-full z-10">
          <div className="relative h-[50%] w-full flex justify-start items-start overflow-hidden bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{targetChar}</span>
            </div>
          </div>
        </div>
      </div>

      <div id="BOTTOM" className="absolute mt-[1px] h-full w-full" style={{ perspective: '400px' }}>
        <div id="BOTTOM-FRONT" className="absolute w-full h-full flex items-end z-10">
          <div className="relative h-[50%] w-full flex items-end overflow-hidden brightness-[85%] bg-sql-gray">
            <div className="relative h-[200%] w-full flex justify-center items-center">
              <span>{targetChar}</span>
            </div>
          </div >
        </div>
      </div>
    </div>
  );
}

export default SplitFlapStaticCharacter;