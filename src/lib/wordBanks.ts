// src/lib/wordbanks.ts

type WordEntry = { word: string; length: number };

export const wordBanks: Record<string, WordEntry[]> = {
	animals: [
		{ word: "cat", length: 3 },
		{ word: "elephant", length: 8 },
		{ word: "lion", length: 4 },
		{ word: "hippopotamus", length: 12 },
	],
	countries: [
		{ word: "canada", length: 6 },
		{ word: "brazil", length: 6 },
		{ word: "japan", length: 5 },
		{ word: "italy", length: 5 },
	],
	colors: [
		{ word: "red", length: 3 },
		{ word: "blue", length: 4 },
		{ word: "green", length: 5 },
		{ word: "yellow", length: 6 },
	],
	fruits: [
		{ word: "apple", length: 5 },
		{ word: "banana", length: 6 },
		{ word: "cherry", length: 6 },
		{ word: "grape", length: 5 },
	],
};
