import { useMemo } from "react";
import SplitFlapCharacter, { SplitFlapCharacterProps } from "./SplitFlapCharacter";
import SplitFlapWord from "./SplitFlapWord";

interface SplitFlapRowProps extends SplitFlapCharacterProps {
  word?: string;
  length?: number;
}
const SplitFlapRow = (props: SplitFlapRowProps) => {
  const { word = "TEST", length = 10 } = props;
  const row: string[] = useMemo(() => {
    return new Array(length).fill('');
  }, [length]);

  return (
    <div className="flex flex-row gap-1 bg-stone-900 p-2">
      {props.type === 'WORD' ? (
        <SplitFlapWord targetWord={word} {...props} />
      ) :
        row.map((a, i) => (
          <SplitFlapCharacter key={i} targetChar={word.toUpperCase()[i] ?? ""} {...props} />
        ))
      }
    </div>
  )
}

export default SplitFlapRow;