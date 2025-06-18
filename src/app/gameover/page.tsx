"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function GameOver() {
	const [score, setScore] = useState(0);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const scoreParam = params.get("score");
		if (scoreParam) {
			setScore(parseInt(scoreParam, 10));
		}
	}, []);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-4xl font-bold mb-4'>Game Over</h1>
			<p className='text-xl mb-6'>Your score: {score}</p>
			<Link href='/' className='bg-blue-600 text-white px-6 py-3 rounded-xl'>
				Return Home
			</Link>
		</div>
	);
}

export default GameOver;
