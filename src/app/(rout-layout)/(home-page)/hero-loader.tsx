/** @format */

import { getHeroData } from "@/app/data";
import { HeroSection } from "@/components/sections";
import { HeroSkeleton } from "@/components/sections/skeleton";
import { HeroData } from "@/type/index";
import { Suspense } from "react";

export async function HeroLoader() {
	const data: any = await getHeroData();
	return (
		<main className='bg-background text-foreground'>
			<Suspense fallback={<HeroSkeleton />}>
				<HeroSection data={data} />
			</Suspense>

			{/* Repeat this pattern for other sections */}
		</main>
	);
}
