import { CONTENTFUL_ACCESS_TOKEN } from "@/app/models/constants";
import { client } from "../Client";
import { TypeSettingsEntry, TypeSettingsSkeleton } from "../types/TypeSettings";
import { TextElement, parseContentfulTextElement, parseContentfulTextElements } from "./SplitFlapColumn";
import { SplitFlapRow, parseContentfulSplitFlapRows } from "./SplitFlapRow";

export interface Settings {
	title?: TextElement;
	columns?: TextElement[];
	rows?: SplitFlapRow[];
	initialSpeed?: number;
	finalSpeed?: number;
	logoWidth?: number;
	rowHeight?: number;
	rowFontSize?: number;
	scale?: number;
}

export const DefaultSettings: Settings = {
	title: {  text: "DEPARTURES", fontSize: 55 },
	columns: [],
	rows: [],
	initialSpeed: 0.02,
	finalSpeed: 0.15,
	logoWidth: 80,
	rowHeight: 100,
	rowFontSize: 28,
	scale: 1,
}

export const parseContentfulSettings = (settings: TypeSettingsEntry): Settings | null => {
	if (!settings) return null;

	return {
		title: parseContentfulTextElement(settings?.fields?.title) ?? DefaultSettings.title,
		columns: parseContentfulTextElements(settings?.fields?.columns) ?? DefaultSettings.columns,
		rows: parseContentfulSplitFlapRows(settings?.fields?.rows) ?? DefaultSettings.rows,
		initialSpeed: settings?.fields?.initialSpeed ?? DefaultSettings.initialSpeed,
		finalSpeed: settings?.fields?.finalSpeed ?? DefaultSettings.finalSpeed,
		logoWidth: settings?.fields?.logoWidth ?? DefaultSettings.logoWidth,
		rowHeight: settings?.fields?.rowHeight ?? DefaultSettings.rowHeight,
		rowFontSize: settings?.fields?.rowFontSize ?? DefaultSettings.rowFontSize,
		scale: settings?.fields?.scale ?? DefaultSettings.scale
	};
};

export const fetchSettings = async (): Promise<Settings> => {
	const settingsResult = await client.getEntries<TypeSettingsSkeleton>({
		content_type: 'settings',
		order: ["-sys.createdAt"],
		include: 2,
	});
	if (!settingsResult || settingsResult?.items?.length == 0) return DefaultSettings;

	const parsed = parseContentfulSettings(settingsResult?.items[0]);
	if (!parsed) return DefaultSettings;

	return parsed;
};
