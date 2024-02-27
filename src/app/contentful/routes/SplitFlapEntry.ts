import { TypeSplitFlapEntryEntry } from "../types/TypeSplitFlapEntry";

export interface SplitFlapEntry {
  text?: string;
  columnId?: number;
  color?: string;
}

export const EmptySplitFlapEntry: SplitFlapEntry = {
  text: "",
  columnId: 0,
  color: '',
}

export const parseContentfulSplitFlapEntry = (splitFlapEntry?: TypeSplitFlapEntryEntry | any): SplitFlapEntry | null => {
	if (!splitFlapEntry) return null;

	return {
    text: splitFlapEntry?.fields?.text ?? "",
    columnId: splitFlapEntry?.fields?.columnId || 0,
    color: splitFlapEntry?.fields?.color || '',
	};
};

export const parseContentfulSplitFlapEntrys = (splitFlapEntrys?: TypeSplitFlapEntryEntry[] | any[]): SplitFlapEntry[] | null => {
	if (!splitFlapEntrys || splitFlapEntrys.length == 0) return null;

	return splitFlapEntrys.map((row) => parseContentfulSplitFlapEntry(row) as SplitFlapEntry);
};