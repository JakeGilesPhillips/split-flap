import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import { TypeTextElementSkeleton } from "./TypeSplitFlapColumn";
import { TypeColumnNewSkeleton } from "./TypeColumnNew";

export interface TypeSettingsNewFields {
	name?: EntryFieldTypes.Text;
	title?: EntryFieldTypes.EntryLink<TypeTextElementSkeleton>
	columns?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeColumnNewSkeleton>>;
	initialSpeed?: EntryFieldTypes.Number;
	finalSpeed?: EntryFieldTypes.Number;
	logoWidth?: EntryFieldTypes.Integer;
	rowHeight?: EntryFieldTypes.Integer;
	rowFontSize?: EntryFieldTypes.Integer;
	scale?: EntryFieldTypes.Number;
}

export type SettingsNewType = "settingsNew";
export type TypeSettingsNewEntry = Entry<TypeSettingsNewSkeleton, undefined, string>;
export type TypeSettingsNewSkeleton = EntrySkeletonType<TypeSettingsNewFields, SettingsNewType>;
export type TypeSettingsNew<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSettingsNewSkeleton, Modifiers, Locales>;
