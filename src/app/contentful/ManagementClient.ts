import { createClient } from "contentful-management";
import { CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_SPACE_ID } from "@/app/models/constants"

export const managementClient = createClient({
	accessToken: CONTENTFUL_MANAGEMENT_TOKEN!,
});

export const managementNoCacheClient = createClient({
	accessToken: CONTENTFUL_MANAGEMENT_TOKEN!,
	headers: { cache: "no-store" },
});

export const managementEnvironment = async () => {
	const space = await managementClient.getSpace(CONTENTFUL_SPACE_ID);
	const environment = await space.getEnvironment('master');
	return environment;
}