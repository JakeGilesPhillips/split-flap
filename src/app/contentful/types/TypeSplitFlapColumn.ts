import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTextElementFields {
	text?: EntryFieldTypes.Text;
	fontSize?: EntryFieldTypes.Integer;
	characters?: EntryFieldTypes.Integer;
	type?: EntryFieldTypes.Text;
	id?: EntryFieldTypes.Integer;
}

export type TextElementType = "textElements";
export type TypeTextElementEntry = Entry<TypeTextElementSkeleton, undefined, string>;
export type TypeTextElementSkeleton = EntrySkeletonType<TypeTextElementFields, TextElementType>;
export type TypeTextElement<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextElementSkeleton, Modifiers, Locales>;
