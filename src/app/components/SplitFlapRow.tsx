"use client"
import { memo } from "react";
import SplitFlapWord from "./SplitFlapWord";

interface SplitFlapRowProps {
  index: number;
}
const SplitFlapRow = memo(({ index }: SplitFlapRowProps) => {

  return (
    <div className="flex flex-col justify-start items-start gap-2 bg-black/50 px-4 py-4 rounded-xl">
      <div className="flex flex-row justify-start items-start gap-4">
        <SplitFlapWord columnName="SESSION" columnKey="Session" animated={false} rowIndex={index} maxLength={72} type={'ALPHANUMERIC'} date={false} />
      </div>
      <div className="flex flex-row justify-between items-between gap-1 w-full">
        <SplitFlapWord columnName="GATE" columnKey="Room" animated={false} rowIndex={index} type='WORD' maxLength={9} date={false} />
        <SplitFlapWord columnName="SPEAKER" columnKey="Speakers" animated={false} rowIndex={index} type='WORD' maxLength={28} date={false} />
        <SplitFlapWord columnName="START TIME" columnKey="StartTime" animated={false} rowIndex={index} maxLength={4} type={'WORD'} date={true} />
        <SplitFlapWord columnName="END TIME" columnKey="EndTime" animated={false} rowIndex={index} maxLength={4} type={'WORD'} date={true} />
      </div>
    </div>
  )
});

SplitFlapRow.displayName = 'SplitFlapRow';
export default SplitFlapRow;