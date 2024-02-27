import { TypeTextElementEntry } from "../types/TypeSplitFlapColumn";

export type CharacterType = 'ALPHABET' | 'NUMERIC' | 'ALPHANUMERIC' | 'WORD';
export const CharacterTypeMap = new Map<string, CharacterType>([
  ['ALPHANUMERIC', 'ALPHANUMERIC'],
  ['ALPHABET', 'ALPHABET'],
  ['NUMERIC', 'NUMERIC'],
  ['WORD', 'WORD'],
	['','ALPHANUMERIC']
])

export interface TextElement {
  id?: number;
  text?: string;
  fontSize?: number;
	type?: CharacterType;
	characters?: number;
}

export const EmptyTextElement: TextElement = {
  id: 0,
  text: "",
  fontSize: 35,
	type: CharacterTypeMap.get('ALPHANUMERIC'),
	characters: 10,
}

export const parseContentfulTextElement = (textElement?: TypeTextElementEntry | any): TextElement | null => {
	if (!textElement) return null;

	return {
		text: textElement?.fields?.text || EmptyTextElement.text,
		fontSize: textElement?.fields?.fontSize || EmptyTextElement.fontSize,
		characters: textElement?.fields?.characters || EmptyTextElement.characters,
		type: CharacterTypeMap.get(textElement?.fields?.type || ''),
		id: textElement?.fields?.id || EmptyTextElement.id,
	};
};

export const parseContentfulTextElements = (textElements?: TypeTextElementEntry[] | any[]): TextElement[] | null => {
	if (!textElements || textElements.length == 0) return null;
	
	return textElements.map((te) => parseContentfulTextElement(te) as TextElement);
};