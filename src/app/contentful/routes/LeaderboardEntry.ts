import { CONTENTFUL_SPACE_ID } from "@/app/models/constants";
import { client } from "../Client";
import { managementEnvironment } from "../ManagementClient";
import { TypeLeaderboardEntryEntry, TypeLeaderboardEntrySkeleton } from "../types/TypeLeaderboardEntry";
import ShortUniqueId from "short-unique-id";

export interface LeaderboardEntry {
	name?: string;
  email?: string;
  company?: string;
  score?: number;
}

export const DefaultLeaderboardEntry: LeaderboardEntry = {
  name: 'Jake',
  email: 'jake.phillips@pytch.co.uk',
  company: 'PYTCH',
  score: 1,
}

export const parseContentfulLeaderboardEntry = (leaderboardEntry: TypeLeaderboardEntryEntry): LeaderboardEntry | null => {
	if (!leaderboardEntry) return null;

	return {
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

export const postLeaderboardEntry = async (leaderboardEntry: LeaderboardEntry): Promise<boolean> => {
  const id = new ShortUniqueId();
  const environment = await managementEnvironment();
  const leaderboardEntryResult = await environment.createEntry('leaderboardEntry', {
    'fields': {
      "name": {
        'en-US': leaderboardEntry.name
      },
      "score": {
        'en-US': leaderboardEntry.score
      }
    }
  });

  if (leaderboardEntryResult) {
    const published = await leaderboardEntryResult.publish();
    if (published.isPublished()) return true;
  }
  return false;
}
