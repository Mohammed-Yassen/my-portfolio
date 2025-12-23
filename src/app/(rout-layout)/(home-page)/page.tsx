/** @format */

import { AboutSection } from "@/components/sections";
import { HeroLoader } from "./hero-loader";

export default function Home() {
	return (
		<main className='bg-background text-foreground'>
			<HeroLoader />
			<AboutSection />
		</main>
	);
}
