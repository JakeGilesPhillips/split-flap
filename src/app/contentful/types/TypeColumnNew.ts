import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeColumnNewFields {
	key: EntryFieldTypes.Text;
  displayLabel: EntryFieldTypes.Text;
}

export type ColumnNewType = "columnNew";
export type TypeColumnNewEntry = Entry<TypeColumnNewSkeleton, undefined, string>;
export type TypeColumnNewSkeleton = EntrySkeletonType<TypeColumnNewFields, ColumnNewType>;
export type TypeColumnNew<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeColumnNewSkeleton, Modifiers, Locales>;
