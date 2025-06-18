"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { wordBanks } from "@/lib/wordBanks";

function ConfigureContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const difficulty = searchParams.get("difficulty") || "medium";

	const [selectedCategories, setSelectedCategories] = useState<string[]>([
		"animals",
		"colors",
	]);
	const [gameOptions, setGameOptions] = useState({
		allowRetry: false,
	});

	const handleCategoryToggle = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const handleOptionChange = (
		option: keyof typeof gameOptions,
		value: boolean
	) => {
		setGameOptions((prev) => ({
			...prev,
			[option]: value,
		}));
	};

	const startGame = () => {
		const params = new URLSearchParams();
		params.set("difficulty", difficulty);
		params.set("categories", selectedCategories.join(","));
		Object.entries(gameOptions).forEach(([key, value]) => {
			params.set(key, value ? "1" : "0");
		});
		router.push(`/game?${params.toString()}`);
	};

	const categoryKeys = Object.keys(wordBanks);

	return (
		<div className='min-h-screen bg-zinc-900 text-white'>
			<nav className='bg-zinc-800 shadow p-4 flex justify-between items-center'>
				<div className='text-xl font-bold'>TypeMania</div>
				<div className='text-sm text-zinc-400 capitalize'>
					{difficulty} mode
				</div>
			</nav>

			<main className='max-w-4xl mx-auto px-6 py-10'>
				<Link
					href='/'
					className='text-orange-400 hover:text-orange-300 text-sm mb-4 inline-block'>
					← Back to difficulty selection
				</Link>

				<h1 className='text-2xl font-bold mb-4'>Game Configuration</h1>

				<section className='mb-10'>
					<h2 className='text-lg font-semibold mb-2'>Word Categories</h2>
					<p className='text-sm text-zinc-400 mb-4'>
						Select types of words to appear during the game.
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{categoryKeys.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryToggle(category)}
								className={`p-3 rounded-lg border text-sm capitalize transition ${
									selectedCategories.includes(category)
										? "bg-orange-600 text-white border-orange-600"
										: "bg-zinc-800 text-white border-zinc-600"
								}`}>
								{category}
							</button>
						))}
					</div>
				</section>

				<section className='mb-10'>
					<h2 className='text-lg font-semibold mb-2'>Game Options</h2>
					<p className='text-sm text-zinc-400 mb-4'>
						Customize your gameplay experience.
					</p>
					<div className='space-y-4'>
						{[
							{
								key: "allowRetry",
								label: "Allow one retry before game ends",
							},
						].map(({ key, label }) => (
							<label
								key={key}
								className='flex items-center justify-between bg-zinc-800 p-4 rounded border border-zinc-600'>
								<span className='text-sm text-white'>{label}</span>
								<input
									type='checkbox'
									checked={gameOptions[key as keyof typeof gameOptions]}
									onChange={(e) =>
										handleOptionChange(
											key as keyof typeof gameOptions,
											e.target.checked
										)
									}
									className='w-5 h-5'
								/>
							</label>
						))}
					</div>
				</section>

				<div className='flex justify-center'>
					<button
						onClick={startGame}
						disabled={selectedCategories.length === 0}
						className='px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded disabled:opacity-50'>
						Start Game
					</button>
				</div>
			</main>
		</div>
	);
}

export default function ConfigurePage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ConfigureContent />
		</Suspense>
	);
}
