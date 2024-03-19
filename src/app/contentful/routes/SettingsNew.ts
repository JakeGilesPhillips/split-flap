import { client } from "../Client";
import { TypeSettingsNewEntry, TypeSettingsNewSkeleton } from "../types/TypeSettingsNew";
import { ColumnNew, parseContentfulColumnNews } from "./ColumnNew";
import { TextElement, parseContentfulTextElement, parseContentfulTextElements } from "./SplitFlapColumn";

export interface SettingsNew {
	name?: string;
	title?: TextElement;
	columns?: ColumnNew[];
	initialSpeed?: number;
	finalSpeed?: number;
	logoWidth?: number;
	rowHeight?: number;
	rowFontSize?: number;
	scale?: number;
}

export const DefaultSettingsNew: SettingsNew = {
	name: '',
	title: {  text: "DEPARTURES", fontSize: 55 },
	columns: [],
	initialSpeed: 0.02,
	finalSpeed: 0.15,
	logoWidth: 80,
	rowHeight: 100,
	rowFontSize: 28,
	scale: 1,
}

export const parseContentfulSettingsNew = (settings: TypeSettingsNewEntry): SettingsNew | null => {
	if (!settings) return null;

	return {
		name: settings?.fields?.name ?? DefaultSettingsNew.name,
		title: parseContentfulTextElement(settings?.fields?.title) ?? DefaultSettingsNew.title,
		columns: parseContentfulColumnNews(settings?.fields?.columns) ?? DefaultSettingsNew.columns,
		initialSpeed: settings?.fields?.initialSpeed ?? DefaultSettingsNew.initialSpeed,
		finalSpeed: settings?.fields?.finalSpeed ?? DefaultSettingsNew.finalSpeed,
		logoWidth: settings?.fields?.logoWidth ?? DefaultSettingsNew.logoWidth,
		rowHeight: settings?.fields?.rowHeight ?? DefaultSettingsNew.rowHeight,
		rowFontSize: settings?.fields?.rowFontSize ?? DefaultSettingsNew.rowFontSize,
		scale: settings?.fields?.scale ?? DefaultSettingsNew.scale
	};
};

export const fetchSettingsNew = async (name?: string): Promise<SettingsNew> => {
	const settingsResult = await client.getEntries<TypeSettingsNewSkeleton>({
		content_type: 'settingsNew',
		"fields.name[match]": name,
		order: ["-sys.createdAt"],
		include: 2,
	});
	if (!settingsResult || settingsResult?.items?.length == 0) return DefaultSettingsNew;

	const parsed = parseContentfulSettingsNew(settingsResult?.items[0]);
	if (!parsed) return DefaultSettingsNew;

	return parsed;
};
