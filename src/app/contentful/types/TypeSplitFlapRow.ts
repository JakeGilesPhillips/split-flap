import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import { TypeSplitFlapEntrySkeleton } from "./TypeSplitFlapEntry";

export interface TypeSplitFlapRowFields {
	rowName?: EntryFieldTypes.Text;
	columns?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSplitFlapEntrySkeleton>>
	order?: EntryFieldTypes.Integer;
}

export type SplitFlapRowType = "splitFlapRow";
export type TypeSplitFlapRowEntry = Entry<TypeSplitFlapRowSkeleton, undefined, string>;
export type TypeSplitFlapRowSkeleton = EntrySkeletonType<TypeSplitFlapRowFields, SplitFlapRowType>;
export type TypeSplitFlapRow<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSplitFlapRowSkeleton, Modifiers, Locales>;
