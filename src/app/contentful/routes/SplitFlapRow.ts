import { TypeSplitFlapRowEntry } from "../types/TypeSplitFlapRow";
import { SplitFlapEntry, parseContentfulSplitFlapEntrys } from "./SplitFlapEntry";

export interface SplitFlapRow {
  order: number;
  columns?: SplitFlapEntry[];
}

export const EmptySplitFlapRow: SplitFlapRow = {
  order: 0,
  columns: [],
}

export const parseContentfulSplitFlapRow = (splitFlapRow?: TypeSplitFlapRowEntry): SplitFlapRow | null => {
	if (!splitFlapRow) return null;

	return {
    order: splitFlapRow?.fields?.order ?? 0,
    columns: parseContentfulSplitFlapEntrys(splitFlapRow?.fields?.columns) ?? [],
	};
};

export const parseContentfulSplitFlapRows = (splitFlapRows?: TypeSplitFlapRowEntry[] | any[]): SplitFlapRow[] | null => {
	if (!splitFlapRows || splitFlapRows.length == 0) return null;

	return splitFlapRows.map((row) => parseContentfulSplitFlapRow(row) as SplitFlapRow).sort((a, b) => a?.order - b?.order);
};