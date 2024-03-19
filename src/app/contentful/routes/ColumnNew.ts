import { TypeColumnNewEntry } from "../types/TypeColumnNew";

export interface ColumnNew {
  key: string;
  displayLabel: string;
}

export const EmptyColumnNew: ColumnNew = {
  key: "",
  displayLabel: "",
}

export const parseContentfulColumnNew = (columnNew?: TypeColumnNewEntry | any): ColumnNew | null => {
	if (!columnNew) return null;

	return {
		key: columnNew?.fields?.key || EmptyColumnNew.key,
    displayLabel: columnNew?.fields?.displayLabel || EmptyColumnNew.displayLabel,
	};
};

export const parseContentfulColumnNews = (columnNews?: TypeColumnNewEntry[] | any[]): ColumnNew[] | null => {
	if (!columnNews || columnNews.length == 0) return null;
	
	return columnNews.map((cn) => parseContentfulColumnNew(cn) as ColumnNew);
};