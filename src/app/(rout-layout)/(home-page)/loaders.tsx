/** @format */

import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { CertificationsSection } from "@/components/sections/certification-section";
import { ExperienceEducationSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";

import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

/** @format */
import {
	getAboutData,
	getHeroData,
	getFeaturedProjects,
	getSkillData,
	getExperiences,
	getEducation,
	getCertifications,
	getTestimonialData,
} from "@/data";
import { getBlogs } from "@/data/blogs";
import { Project } from "@/types/projects-type";
import { AlertCircle } from "lucide-react";
// ... (Your Section Imports)

export async function HeroLoader() {
	const data = await getHeroData();
	return <HeroSection data={data} />;
}

export async function AboutLoader() {
	const data = await getAboutData();
	return <AboutSection aboutData={data} />;
}

export async function SkillsLoader() {
	const data = await getSkillData();
	return <SkillsSection data={data} />;
}

/** @format */

export async function ProjectsLoader() {
	// 1. Fetch the data with relations
	const rawData = (await getFeaturedProjects()) as Project[];

	return <ProjectsSection projectsData={rawData} />;
}

export async function ExperianceAndEducationLoader() {
	// Parallel fetching for speed
	const [experienceData, educationData] = await Promise.all([
		getExperiences(),
		getEducation(),
	]);
	return (
		<ExperienceEducationSection
			expData={experienceData}
			educData={educationData}
		/>
	);
}

export async function CertificationsLoader() {
	const response = await getCertifications();
	if (!response.success) return <ErrorBox message={response.error} />;
	return <CertificationsSection certifications={response.data ?? []} />;
}

export async function BlogsLoader() {
	const response = await getBlogs();
	if (!response) return <ErrorBox message='Failed to load blogs' />;
	return <BlogSection blogs={response} />;
}

// Reusable error UI to keep code DRY (Don't Repeat Yourself)
function ErrorBox({ message }: { message?: string }) {
	return (
		<div className='p-6 border-2 border-destructive/20 bg-destructive/5 rounded-3xl flex items-center gap-3 text-destructive'>
			<AlertCircle size={20} />
			<p className='text-sm font-medium'>
				{message || "Error loading section."}
			</p>
		</div>
	);
}

export async function TestimonialsLoader() {
	const data = await getTestimonialData();

	if (!data) {
		return <ErrorBox message='Failed to load testimonials' />;
	}

	// Optional: Return null if no testimonials exist to hide the section entirely
	if (data.length === 0) return null;

	return <TestimonialsSection data={data} />;
}
