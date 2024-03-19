import { format } from "date-fns";
import { SplitFlapEntry } from "../contentful/routes/SplitFlapEntry";
import { SplitFlapRow } from "../contentful/routes/SplitFlapRow";
import { Schedule } from "../models/api";

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

export const GetColumnFromScheduleByKey = (key: string, object: Schedule, date?: boolean): string => {
  const value = object[key as keyof Schedule];

  if (date) {
      const formatted = format(new Date(value), 'kk:mm');
      console.log(formatted);
      return formatted;
  } else {
    if (value != null) {
      switch (typeof value) {
        case 'string': return value;
        case 'number': return value.toString();
      }
    }
    return "";
  }
}

export const GetAlColumnRowsFromScheduleByKey = (key: string, object: Schedule[], date: boolean): string[] => {
  const keys = object.map((a) => GetColumnFromScheduleByKey(key, a, date).toUpperCase()).sort((a, b) => a.length - b.length);
  return keys;
}

export const GetMaximumColumnLengthFromScheduleByKey = (key: string, object: Schedule[]): number => {
  const keys = object.map((a) => GetColumnFromScheduleByKey(key, a)).sort((a, b) => b.length - a.length);
  return keys[0].length;
}

export const timeout = (delay: number) => {
  return new Promise( res => setTimeout(res, delay) );
}

export const arraysEqual = (array1: string[], array2: string[]) => {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}