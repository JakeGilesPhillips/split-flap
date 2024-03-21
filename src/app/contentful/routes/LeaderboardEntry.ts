import { client } from "../Client";
import { KeyValueMap } from "contentful-management";
import { managementEnvironment } from "../ManagementClient";
import { TypeLeaderboardEntryEntry, TypeLeaderboardEntrySkeleton } from "../types/TypeLeaderboardEntry";
import { capitalize } from "@/app/helpers/DataHelper";

export interface LeaderboardEntry {
  id?: string;
	name?: string;
  email?: string;
  company?: string;
  score?: number;
}

export const DefaultLeaderboardEntry: LeaderboardEntry = {
  id: 'ABC123',
  name: 'Jake',
  email: 'jake.phillips@pytch.co.uk',
  company: 'PYTCH',
  score: 1,
}

export const parseContentfulLeaderboardEntry = (leaderboardEntry: TypeLeaderboardEntryEntry): LeaderboardEntry | null => {
	if (!leaderboardEntry) return null;

	return {
    id: leaderboardEntry?.sys.id ?? DefaultLeaderboardEntry.id,
		name: leaderboardEntry?.fields?.name ?? DefaultLeaderboardEntry.name,
		email: leaderboardEntry?.fields?.email ?? DefaultLeaderboardEntry.email,
		company: leaderboardEntry?.fields?.company ?? DefaultLeaderboardEntry.company,
		score: leaderboardEntry?.fields?.score ?? DefaultLeaderboardEntry.score,
	};
};

export const parseContentfulLeaderboardEntries = (leaderboardEntries?: TypeLeaderboardEntryEntry[] | any[]): LeaderboardEntry[] | null => {
	if (!leaderboardEntries || leaderboardEntries.length == 0) return null;

	return leaderboardEntries.map((row) => parseContentfulLeaderboardEntry(row) as LeaderboardEntry);
};

export const fetchLeaderboardEntries = async (): Promise<LeaderboardEntry[]> => {
	const leaderboardEntryResult = await client.getEntries<TypeLeaderboardEntrySkeleton>({
		content_type: 'leaderboardEntry',
		order: ["-fields.score"],
		include: 2,
	});
	if (!leaderboardEntryResult || leaderboardEntryResult?.items?.length == 0) return [DefaultLeaderboardEntry];

	const parsed = parseContentfulLeaderboardEntries(leaderboardEntryResult?.items);
	if (!parsed) return [DefaultLeaderboardEntry];

	return parsed;
};

export const leaderboardEntryToFields = (leaderboardEntry: LeaderboardEntry): KeyValueMap => {
  return {
      "name": {
        'en-US': capitalize(leaderboardEntry?.name || '')
      },
      "email": {
        'en-US': leaderboardEntry.email
      },
      "company": {
        'en-US': leaderboardEntry.company
      },
      "score": { 
        "en-US": leaderboardEntry.score
      }
    }
}

export const postLeaderboardEntry = async (leaderboardEntry: LeaderboardEntry): Promise<boolean> => {
  // Create contentful environment
  const environment = await managementEnvironment();

  // Check for an existing entry under that name
  const entries = await fetchLeaderboardEntries();
  const existing = entries.find((a) => a.name?.toLowerCase() === leaderboardEntry.name?.toLowerCase());
  
  // Setup result & fields
  let leaderboardEntryResult: any =  null;
  const fields = leaderboardEntryToFields(leaderboardEntry);

  // Update or create entry
  if (existing && existing.id) {
    const entry = await environment.getEntry(existing.id);
    entry.fields = fields;

    leaderboardEntryResult = await entry.update();
  } else {
    leaderboardEntryResult = await environment.createEntry('leaderboardEntry', { 'fields': fields });
  }
 
  // Publish changes straight away
  if (leaderboardEntryResult) {
    const published = await leaderboardEntryResult.publish();
    if (published.isPublished()) return true;
  }
  return false;
}
