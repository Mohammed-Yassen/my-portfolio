/** @format */

import {
	getAboutData,
	getHeroData,
	getFeaturedProjects,
	getSkillData,
} from "@/app/data";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import {
	AboutSkeleton,
	HeroSkeleton,
	ProjectsSkeleton,
	SkillsSkeleton,
} from "@/components/sections/skeleton";
import { SkillsSection } from "@/components/sections/skills-section";
import { Project } from "@/type/projects-type";

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
	const data = await getAboutData();

	return (
		<main className='bg-background text-foreground'>
			<Suspense fallback={<AboutSkeleton />}>
				<AboutSection aboutData={data} />
			</Suspense>

			{/* Repeat this pattern for other sections */}
		</main>
	);
}
export async function SkillsLoader() {
	const data: any = await getSkillData();

	return (
		<main className='bg-background text-foreground'>
			<Suspense fallback={<SkillsSkeleton />}>
				<SkillsSection data={data} />
			</Suspense>

			{/* Repeat this pattern for other sections */}
		</main>
	);
}
export async function ProjectsLoader() {
	const data = (await getFeaturedProjects()) as Project[];

	return (
		<main className='bg-background text-foreground'>
			<Suspense fallback={<ProjectsSkeleton />}>
				<ProjectsSection projectsData={data} />
			</Suspense>

			{/* Repeat this pattern for other sections */}
		</main>
	);
}
