/** @format */

import {
	getAboutData,
	getHeroData,
	getFeaturedProjects,
	getSkillData,
	getExperiences,
	getEducation,
	getCertifications,
} from "@/app/data";
import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certification-section";
import { ExperienceEducationSection } from "@/components/sections/experience-section";
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
import { AlertCircle } from "lucide-react";

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
export async function ExperianceAndEducationLoader() {
	const [experienceData, educationData] = await Promise.all([
		getExperiences(),
		getEducation(), // You need to add this to your data.ts
	]);
	return (
		<main className='bg-background text-foreground'>
			<Suspense fallback={<ProjectsSkeleton />}>
				<ExperienceEducationSection
					expData={experienceData}
					educData={educationData}
				/>
			</Suspense>

			{/* Repeat this pattern for other sections */}
		</main>
	);
}
export async function CertificationsLoader() {
	// 1. Fetch the ActionResponse object
	const response = await getCertifications();

	// 2. Handle the Error state
	if (!response.success) {
		return (
			<div className='p-6 border-2 border-destructive/20 bg-destructive/5 rounded-3xl flex items-center gap-3 text-destructive'>
				<AlertCircle size={20} />
				<p className='text-sm font-medium'>
					{response.error || "Failed to load certifications."}
				</p>
			</div>
		);
	}

	// 3. Pass the actual array (data) to the Manager
	// We provide an empty array fallback [] just in case data is undefined
	const certifications = response.data ?? [];

	return <CertificationsSection certifications={certifications} />;
}
