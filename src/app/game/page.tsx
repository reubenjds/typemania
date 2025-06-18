"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { wordBanks } from "@/lib/wordBanks";

export default function Game() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const difficulty = searchParams.get("difficulty") || "medium";
	const selected = searchParams.get("categories")?.split(",") || [];

	const settings = {
		allowRetry: searchParams.get("allowRetry") === "1",
	};

	const initialLives = settings.allowRetry ? 2 : 1;
	const [lives, setLives] = useState(initialLives);

	const [score, setScore] = useState(0);
	const [sequence, setSequence] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [gameState, setGameState] = useState<"playing" | "showing">("showing");
	const [showingWordIndex, setShowingWordIndex] = useState(0);
	const [usedWords, setUsedWords] = useState<string[]>([]);
	const [wordsAdded, setWordsAdded] = useState(1);
	const inputRef = useRef<HTMLInputElement>(null);

	const getFilteredWordPool = () => {
		const maxLen =
			difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 100;
		return selected.flatMap((cat) =>
			(wordBanks[cat] || [])
				.filter((w) => w.length <= maxLen)
				.map((w) => w.word)
		);
	};

	const getRandomWord = () => {
		const pool = getFilteredWordPool();
		const availableWords = pool.filter((word) => !usedWords.includes(word));
		const choice = availableWords.length > 0 ? availableWords : pool;
		return choice[Math.floor(Math.random() * choice.length)];
	};

	const getRandomWordsToAdd = (currentScore: number) => {
		const multiWordChance = Math.min(currentScore * 0.15, 0.6);
		if (Math.random() < multiWordChance) {
			const maxWords = currentScore >= 8 ? 3 : 2;
			return Math.floor(Math.random() * (maxWords - 1)) + 2;
		}
		return 1;
	};

	const startNewSequence = (currentSequence?: string[]) => {
		const baseSequence = currentSequence ?? sequence;
		const wordsToAdd = score === 0 ? 1 : getRandomWordsToAdd(score);
		const newWords: string[] = [];
		for (let i = 0; i < wordsToAdd; i++) {
			newWords.push(getRandomWord());
		}
		const updatedSequence = [...baseSequence, ...newWords];
		setUsedWords((prev) => [...prev, ...newWords]);
		setWordsAdded(wordsToAdd);
		setSequence(updatedSequence);
		setCurrentWordIndex(0);
		setGameState("showing");
		setShowingWordIndex(0);
		setInputValue("");
		setIsCorrect(null);
	};

	useEffect(() => {
		startNewSequence();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (gameState === "showing" && showingWordIndex < sequence.length) {
			const timer = setTimeout(() => {
				if (showingWordIndex === sequence.length - 1) {
					setGameState("playing");
					inputRef.current?.focus();
				} else {
					setShowingWordIndex((prev) => prev + 1);
				}
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [gameState, showingWordIndex, sequence.length]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (gameState !== "playing") return;

		const typedCorrect =
			inputValue.trim().toLowerCase() ===
			sequence[currentWordIndex].toLowerCase();

		if (typedCorrect) {
			setIsCorrect(true);
			setInputValue("");

			if (currentWordIndex === sequence.length - 1) {
				setScore((prev) => prev + 1);
				setTimeout(() => startNewSequence(sequence), 1000);
			} else {
				setCurrentWordIndex((prev) => prev + 1);
			}
		} else {
			setIsCorrect(false);
			if (lives > 1) {
				setLives((prev) => prev - 1);
			} else {
				const preservedParams = new URLSearchParams(searchParams.toString());
				preservedParams.set("score", score.toString());
				preservedParams.set("sequenceLength", sequence.length.toString());
				router.push(`/gameover?${preservedParams.toString()}`);
			}
		}

		setTimeout(() => setIsCorrect(null), 1000);
	};

	return (
		<div className='min-h-screen bg-zinc-900 text-white px-6 py-10'>
			<div className='flex items-center justify-between mb-8'>
				<h1 className='text-2xl font-bold'>TypeMania</h1>
				<div className='flex items-center gap-6'>
					<div className='text-sm text-zinc-400'>
						Score:{" "}
						<span className='text-orange-400 font-semibold'>{score}</span>
					</div>
					{settings.allowRetry && (
						<div className='text-sm text-zinc-400 flex items-center gap-1'>
							Lives:
							{Array.from({ length: lives }).map((_, i) => (
								<span key={i} className='text-red-400 text-lg'>
									♥
								</span>
							))}
						</div>
					)}
				</div>
			</div>

			{gameState === "showing" ? (
				<div className='text-center'>
					<p className='text-zinc-400 mb-4'>
						{score === 0
							? "Memorize this word:"
							: `Round ${score + 1} - Memorize the sequence:`}
					</p>
					<div className='flex flex-wrap justify-center gap-3'>
						{sequence.map((word, idx) => (
							<div
								key={idx}
								className={`px-6 py-3 rounded-md text-xl font-medium transition-all duration-300 ${
									idx === showingWordIndex
										? "bg-orange-500 text-white scale-110"
										: idx < showingWordIndex
										? "bg-zinc-700 text-zinc-300"
										: "bg-zinc-800 text-zinc-600"
								}`}>
								{word}
							</div>
						))}
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit} className='max-w-xl mx-auto'>
					<div className='flex flex-wrap justify-center gap-4 mb-8'>
						{sequence.map((word, idx) => (
							<div
								key={idx}
								className={`px-4 py-2 rounded-md text-lg font-medium ${
									idx === currentWordIndex
										? "bg-orange-500/20 text-orange-300 border border-orange-500/50"
										: idx < currentWordIndex
										? "bg-green-500/20 text-green-300 border border-green-500/50"
										: "bg-zinc-800 text-zinc-800 border border-zinc-700"
								}`}>
								{idx < currentWordIndex ? word : "???"}
							</div>
						))}
					</div>
					<input
						ref={inputRef}
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						className={`w-full p-4 text-xl rounded bg-zinc-800 border-2 ${
							isCorrect === true
								? "border-green-500"
								: isCorrect === false
								? "border-red-500"
								: "border-zinc-700"
						}`}
						placeholder='Type the next word...'
						autoFocus
					/>
				</form>
			)}
		</div>
	);
}
