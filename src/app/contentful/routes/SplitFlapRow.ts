import { TypeSplitFlapRowEntry } from "../types/TypeSplitFlapRow";
import { SplitFlapEntry, parseContentfulSplitFlapEntrys } from "./SplitFlapEntry";

export interface SplitFlapRow {
  rowName?: string;
  columns?: SplitFlapEntry[];
  order: number;
}

export const EmptySplitFlapRow: SplitFlapRow = {
  rowName: "",
  columns: [],
  order: 0,
}

export const parseContentfulSplitFlapRow = (splitFlapRow?: TypeSplitFlapRowEntry): SplitFlapRow | null => {
	if (!splitFlapRow) return null;

	return {
    rowName: splitFlapRow?.fields?.rowName ?? "",
    columns: parseContentfulSplitFlapEntrys(splitFlapRow?.fields?.columns) ?? [],
    order: splitFlapRow?.fields?.order ?? 0,
	};
};

export const parseContentfulSplitFlapRows = (splitFlapRows?: TypeSplitFlapRowEntry[] | any[]): SplitFlapRow[] | null => {
	if (!splitFlapRows || splitFlapRows.length == 0) return null;

	return splitFlapRows.map((row) => parseContentfulSplitFlapRow(row) as SplitFlapRow).sort((a, b) => a?.order - b?.order);
};