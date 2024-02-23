import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import { TypeTextElementSkeleton } from "./TypeSplitFlapColumn";
import { TypeSplitFlapRowSkeleton } from "./TypeSplitFlapRow";

export interface TypeSettingsFields {
	title?: EntryFieldTypes.EntryLink<TypeTextElementSkeleton>
	columns?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTextElementSkeleton>>;
	rows?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeSplitFlapRowSkeleton>>;
	initialSpeed?: EntryFieldTypes.Number;
	finalSpeed?: EntryFieldTypes.Number;
	logoWidth?: EntryFieldTypes.Integer;
	rowHeight?: EntryFieldTypes.Integer;
	rowFontSize?: EntryFieldTypes.Integer;
	scale?: EntryFieldTypes.Number;
}

export type SettingsType = "settings";
export type TypeSettingsEntry = Entry<TypeSettingsSkeleton, undefined, string>;
export type TypeSettingsSkeleton = EntrySkeletonType<TypeSettingsFields, SettingsType>;
export type TypeSettings<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeSettingsSkeleton, Modifiers, Locales>;
