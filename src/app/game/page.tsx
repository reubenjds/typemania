// /app/game/page.tsx

export const dynamic = "force-dynamic";
export const runtime = "edge";

import { Suspense } from "react";
import Game from "./Game";

export default function GamePage() {
	return (
		<Suspense fallback={<div className='text-white p-10'>Loading game...</div>}>
			<Game />
		</Suspense>
	);
}
