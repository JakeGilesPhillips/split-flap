import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeLeaderboardEntryFields {
	name: EntryFieldTypes.Text;
  company: EntryFieldTypes.Text;
  email: EntryFieldTypes.Text;
  score: EntryFieldTypes.Integer;
}

export type LeaderboardEntryType = "leaderboardEntry";
export type TypeLeaderboardEntryEntry = Entry<TypeLeaderboardEntrySkeleton, undefined, string>;
export type TypeLeaderboardEntrySkeleton = EntrySkeletonType<TypeLeaderboardEntryFields, LeaderboardEntryType>;
export type TypeLeaderboardEntry<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLeaderboardEntrySkeleton, Modifiers, Locales>;
