/** @format */

import { getAboutData, getHeroData } from "@/app/data";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSkeleton, HeroSkeleton } from "@/components/sections/skeleton";
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
export async function AboutLoader() {
	const data: any = await getAboutData();

	return (
		<main className='bg-background text-foreground'>
			<Suspense fallback={<AboutSkeleton />}>
				<AboutSection data={data} />
			</Suspense>

			{/* Repeat this pattern for other sections */}
		</main>
	);
}
