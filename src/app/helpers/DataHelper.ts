import { SplitFlapEntry } from "../contentful/routes/SplitFlapEntry";
import { SplitFlapRow } from "../contentful/routes/SplitFlapRow";

export const GetColumnsFromRowByID = (columnID: number, rows?: SplitFlapRow[]): SplitFlapEntry[]  => {
  let columns: SplitFlapEntry[] = [];

  // Filter rows
  if (rows) {
    rows.forEach((row) => {
       row.columns?.forEach((col) => {
        if (col.columnId === columnID) columns.push(col);
      });
    });
  }

  return columns;
}