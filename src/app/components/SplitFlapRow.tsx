import { useMemo } from "react";
import SplitFlapCharacter, { SplitFlapCharacterProps } from "./SplitFlapCharacter";

interface SplitFlapRowProps extends SplitFlapCharacterProps {
  word?: string;
  length?: number;
}
const SplitFlapRow = (props: SplitFlapRowProps) => {
  const { word = "TEST", length = 10, height = 100 } = props;
  const row: string[] = useMemo(() => {
    return new Array(length).fill('');
  }, [length]);

  return (
    <div className="flex flex-row gap-1 bg-stone-900 p-2">
      {row.map((a, i) => (
        <SplitFlapCharacter key={i} targetChar={word.toUpperCase()[i] ?? ""} {...props} />
      ))}
    </div>
  )
}

export default SplitFlapRow;