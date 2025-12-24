/** @format */
import { Suspense } from "react";
import {
	HeroSkeleton,
	AboutSkeleton,
} from "@/components/dashboard/dash-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutLoader, HeroLoader } from "./identety-loader";

export default function IdentityPage() {
	return (
		<main className='p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen'>
			<div className='max-w-7xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50'>
						Identity Manager
					</h1>
					<p className='text-zinc-500'>Control your digital presence.</p>
				</header>

				<Tabs defaultValue='hero' className='w-full space-y-6'>
					<TabsList className='grid w-full grid-cols-2 h-14 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl'>
						<TabsTrigger value='hero' className='rounded-xl font-bold'>
							1. Hero Essence
						</TabsTrigger>
						<TabsTrigger value='about' className='rounded-xl font-bold'>
							2. About Philosophy
						</TabsTrigger>
					</TabsList>

					<TabsContent value='hero'>
						{/* Suspense only works if the COMPONENT INSIDE IT 
                           is the one doing the 'await'.
                        */}
						<Suspense fallback={<HeroSkeleton />}>
							<HeroLoader />
						</Suspense>
					</TabsContent>

					<TabsContent value='about'>
						<Suspense fallback={<AboutSkeleton />}>
							<AboutLoader />
						</Suspense>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
