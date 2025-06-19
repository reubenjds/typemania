"use client";

import Link from "next/link";

export default function Home() {
	return (
		<div className='min-h-screen bg-zinc-900 text-white'>
			<header className='border-b border-zinc-800'>
				<div className='container mx-auto flex items-center justify-between h-16'>
					<div className='flex items-center gap-2'>
						<div className='w-2.5 h-2.5 rounded-full bg-orange-500' />
						<h1 className='text-xl font-bold'>TypeMania</h1>
					</div>
					<nav className='flex items-center gap-6'>
						<Link
							href='/'
							className='text-sm text-zinc-400 hover:text-white transition'>
							Play
						</Link>
					</nav>
				</div>
			</header>

			<main className='container mx-auto py-16'>
				<div className='max-w-3xl mx-auto text-center mb-12'>
					<h2 className='text-4xl font-bold mb-4'>Challenge Your Memory</h2>
					<p className='text-zinc-400'>
						Remember and type sequences of words in the correct order. How far
						can you go?
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mx-auto'>
					{[
						{
							title: "Easy",
							description: "Perfect for beginners",
							details: [
								"3-5 word sequences",
								"Slower display speed",
								"Simple word categories",
							],
							href: "/configure?difficulty=easy",
						},
						{
							title: "Medium",
							description: "For experienced players",
							details: [
								"3-8 word sequences",
								"Moderate display speed",
								"Mixed word categories",
							],
							href: "/configure?difficulty=medium",
						},
						{
							title: "Hard",
							description: "For memory masters",
							details: [
								"3-12 word sequences",
								"Fast display speed",
								"Complex word categories",
							],
							href: "/configure?difficulty=hard",
						},
					].map((mode) => (
						<div
							key={mode.title}
							className='bg-zinc-800 border border-zinc-700 hover:border-blue-500 transition-all cursor-pointer rounded-lg flex flex-col justify-between'>
							<div className='p-4'>
								<div className='text-xl font-semibold mb-1'>{mode.title}</div>
								<div className='text-sm text-zinc-400 mb-4'>
									{mode.description}
								</div>
								<ul className='text-sm text-zinc-300 space-y-1'>
									{mode.details.map((point) => (
										<li key={point} className='flex items-center gap-2'>
											<span className='w-1.5 h-1.5 rounded-full bg-orange-500'></span>
											{point}
										</li>
									))}
								</ul>
							</div>
							<div className='p-4 pt-2'>
								<Link
									href={mode.href}
									className='block w-full text-center border border-orange-600 text-orange-400 py-2 px-4 rounded hover:bg-orange-900/20 text-sm'>
									Select {mode.title}
								</Link>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
