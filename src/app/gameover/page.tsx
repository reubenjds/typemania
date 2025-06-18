"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function GameOver() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [score, setScore] = useState(0);
	const [sequenceLength, setSequenceLength] = useState(0);

	useEffect(() => {
		const scoreParam = searchParams.get("score");
		const sequenceParam = searchParams.get("sequenceLength");

		if (scoreParam) setScore(parseInt(scoreParam, 10));
		if (sequenceParam) setSequenceLength(parseInt(sequenceParam, 10));
	}, [searchParams]);

	const handleReplay = () => {
		const preservedParams = new URLSearchParams(searchParams.toString());
		preservedParams.delete("score");
		preservedParams.delete("sequenceLength");
		router.replace(`/game?${preservedParams.toString()}`);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4'>
			<h1 className='text-4xl font-bold mb-4'>Game Over</h1>
			<p className='text-xl mb-2'>
				Your score: <span className='text-orange-400'>{score}</span>
			</p>
			<p className='text-md text-zinc-400 mb-6'>
				Longest sequence: {sequenceLength} words
			</p>

			<div className='flex gap-4'>
				<button
					onClick={handleReplay}
					className='bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl'>
					Replay
				</button>
				<Link
					href='/'
					className='bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3 rounded-xl'>
					Return Home
				</Link>
			</div>
		</div>
	);
}
