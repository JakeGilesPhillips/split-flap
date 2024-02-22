import { TypeTextElementEntry } from "../types/TypeSplitFlapColumn";

export type CharacterType = 'ALPHABET' | 'NUMERIC' | 'ALPHANUMERIC';

export interface TextElement {
  text?: string;
  fontSize?: number;
	characters?: number;
	type?: CharacterType;
  id?: number;
}

export const EmptyTextElement: TextElement = {
  text: "",
  fontSize: 35,
	characters: 10,
	type: 'ALPHANUMERIC',
  id: 0
}

export const parseContentfulTextElement = (textElement?: TypeTextElementEntry | any): TextElement | null => {
	if (!textElement) return null;

	return {
		text: textElement?.fields?.text || EmptyTextElement.text,
		fontSize: textElement?.fields?.fontSize || EmptyTextElement.fontSize,
		characters: textElement?.fields?.characters ||EmptyTextElement.characters,
		type: EmptyTextElement.type, //TODO:
		id: textElement?.fields?.id || EmptyTextElement.id,
	};
};

export const parseContentfulTextElements = (textElements?: TypeTextElementEntry[] | any[]): TextElement[] | null => {
	if (!textElements || textElements.length == 0) return null;

	return textElements.map((te) => parseContentfulTextElement(te) as TextElement);
};