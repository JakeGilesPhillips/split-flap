import { TypeSplitFlapEntryEntry } from "../types/TypeSplitFlapEntry";
import { EmptyTextElement, TextElement, parseContentfulTextElement } from "./SplitFlapColumn";

export type CharacterType = 'ALPHABET' | 'NUMERIC' | 'ALPHANUMERIC';

export interface SplitFlapEntry {
  text?: string;
  columnId?: number;
}

export const EmptySplitFlapEntry: SplitFlapEntry = {
  text: "",
  columnId: 0
}

export const parseContentfulSplitFlapEntry = (splitFlapEntry?: TypeSplitFlapEntryEntry | any): SplitFlapEntry | null => {
	if (!splitFlapEntry) return null;

	return {
    text: splitFlapEntry?.fields?.text ?? "",
    columnId: splitFlapEntry?.fields?.columnId || 0,
	};
};

export const parseContentfulSplitFlapEntrys = (splitFlapEntrys?: TypeSplitFlapEntryEntry[] | any[]): SplitFlapEntry[] | null => {
	if (!splitFlapEntrys || splitFlapEntrys.length == 0) return null;

	return splitFlapEntrys.map((row) => parseContentfulSplitFlapEntry(row) as SplitFlapEntry);
};