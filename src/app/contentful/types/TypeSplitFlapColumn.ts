import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTextElementFields {
	id?: EntryFieldTypes.Integer;
	text?: EntryFieldTypes.Text;
	fontSize?: EntryFieldTypes.Integer;
	type?: EntryFieldTypes.Text;
	characters?: EntryFieldTypes.Integer;
}

export type TextElementType = "textElements";
export type TypeTextElementEntry = Entry<TypeTextElementSkeleton, undefined, string>;
export type TypeTextElementSkeleton = EntrySkeletonType<TypeTextElementFields, TextElementType>;
export type TypeTextElement<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextElementSkeleton, Modifiers, Locales>;
