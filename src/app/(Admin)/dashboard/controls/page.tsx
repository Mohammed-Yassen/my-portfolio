/** @format */

import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCategoryForm } from "@/components/dashboard/dash-forms/skills-form";
import { getSkillData } from "@/app/data";
import {
	AboutSkeleton,
	HeroSkeleton,
	SkillManagerSkeleton,
} from "@/components/dashboard/dash-skeleton";
import {
	AboutLoader,
	EducationLoader,
	ExperienceLoader,
	HeroLoader,
} from "./control-loader";

export default async function ControlPage() {
	// Fetch data from your DB helper
	const skillData = await getSkillData();

	return (
		<main className='p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen'>
			<div className='max-w-7xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-3xl font-black text-zinc-900 dark:text-zinc-50'>
						Admin Panel
					</h1>
				</header>

				<Tabs defaultValue='hero' className='w-full'>
					<TabsList className='grid w-full grid-cols-5 h-14 mb-8'>
						<TabsTrigger value='hero' className='rounded-xl font-bold'>
							1. Hero Essence
						</TabsTrigger>
						<TabsTrigger value='about' className='rounded-xl font-bold'>
							2. About Philosophy
						</TabsTrigger>
						<TabsTrigger value='skills'>3. Skills</TabsTrigger>
						<TabsTrigger value='experiances'>4. Experience</TabsTrigger>
						<TabsTrigger value='educations'>5. Education</TabsTrigger>
					</TabsList>

					<TabsContent value='hero'>
						<Suspense fallback={<HeroSkeleton />}>
							<HeroLoader />
						</Suspense>
					</TabsContent>

					<TabsContent value='about'>
						<Suspense fallback={<AboutSkeleton />}>
							<AboutLoader />
						</Suspense>
					</TabsContent>
					<TabsContent value='skills'>
						<Suspense fallback={<SkillManagerSkeleton />}>
							<SkillCategoryForm initialData={skillData} />
						</Suspense>
					</TabsContent>
					<TabsContent value='experiances'>
						<Suspense fallback={<SkillManagerSkeleton />}>
							<ExperienceLoader />
						</Suspense>
					</TabsContent>
					<TabsContent value='educations'>
						<Suspense fallback={<>... </>}>
							<EducationLoader />
						</Suspense>
					</TabsContent>
				</Tabs>
			</div>
		</main>
	);
}
