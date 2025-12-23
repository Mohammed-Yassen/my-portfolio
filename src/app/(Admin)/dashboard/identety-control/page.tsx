/** @format */

import { db } from "@/lib/db";
import { IdentityFormManager } from "./identity-form-manager";

export default async function IdentityPage() {
	// Fetch in parallel for speed
	const [heroData, aboutData] = await Promise.all([
		db.heroSection.findUnique({ where: { id: "hero-static" } }),
		db.aboutSection?.findFirst({ include: { corePillars: true } }),
	]);

	// Format data to match IdentityFormManagerProps
	const initialData = {
		hero: heroData,
		about: aboutData,
	};

	return (
		<main className='p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen'>
			<div className='max-w-7xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50'>
						Identity Manager
					</h1>
					<p className='text-zinc-500'>
						Control your digital presence and core narrative.
					</p>
				</header>

				<IdentityFormManager initialData={initialData} />
			</div>
		</main>
	);
}
