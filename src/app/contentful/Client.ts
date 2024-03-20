import { createClient } from "contentful";
import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } from "@/app/models/constants"

export const client = createClient({
	space: CONTENTFUL_SPACE_ID!,
	accessToken: CONTENTFUL_ACCESS_TOKEN!,
});

export const noCacheClient = createClient({
	space: CONTENTFUL_SPACE_ID!,
	accessToken: CONTENTFUL_ACCESS_TOKEN!,
	headers: { cache: "no-store" },
});