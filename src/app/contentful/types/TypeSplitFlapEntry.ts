import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeSplitFlapEntryFields {
	text?: EntryFieldTypes.Text;
	columnId?: EntryFieldTypes.Integer;
	color?: EntryFieldTypes.Text;
}

export type SplitFlapEntryType = "splitFlapRow";
export type TypeSplitFlapEntryEntry = Entry<TypeSplitFlapEntrySkeleton, undefined, string>;
export type TypeSplitFlapEntrySkeleton = EntrySkeletonType<TypeSplitFlapEntryFields, SplitFlapEntryType>;
export type TypeSplitFlapEntry<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSplitFlapEntrySkeleton, Modifiers, Locales>;
