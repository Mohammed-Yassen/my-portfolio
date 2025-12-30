/** @format */
import {
	getHeroData,
	getAboutData,
	getSkillData,
	getEducation,
	getExperiences,
	getAllTechniques,
	getCertifications,
} from "@/app/data";

import { HeroSectionFields } from "@/components/dashboard/dash-forms/hero-form-fields";
import { AboutSectionFields } from "@/components/dashboard/dash-forms/about-form-fields";
import { SkillCategoryForm } from "@/components/dashboard/dash-forms/skills-form";
import { ExperienceManager } from "@/components/dashboard/dash-forms/experience-manger";
import { EducationManager } from "@/components/dashboard/dash-forms/education-manger";
import { CertificationManager } from "@/components/dashboard/dash-forms/certification-manger";
import { AlertCircle } from "lucide-react";

export async function HeroLoader() {
	const data = await getHeroData();
	return <HeroSectionFields initialData={data} />;
}

export async function AboutLoader() {
	const data = await getAboutData();
	return <AboutSectionFields aboutData={data} />;
}

export async function SkillLoader() {
	const data = await getSkillData();
	return <SkillCategoryForm initialData={data} />;
}

export async function ExperienceLoader() {
	// Parallel fetching is key for senior-level performance
	const [experiences, allTechniques] = await Promise.all([
		getExperiences(),
		getAllTechniques(),
	]);

	return (
		<ExperienceManager experiences={experiences} techniques={allTechniques} />
	);
}

export async function EducationLoader() {
	const data = await getEducation();
	return <EducationManager initialData={data} />;
}

export async function CertificationsLoader() {
	const response = await getCertifications();

	if (!response.success) {
		return (
			<div className='flex flex-col items-center justify-center p-12 border-2 border-dashed border-destructive/20 bg-destructive/5 rounded-[2rem] text-center'>
				<AlertCircle className='text-destructive mb-4' size={40} />
				<h3 className='text-lg font-bold text-destructive'>Data Sync Failed</h3>
				<p className='text-sm text-destructive/80 max-w-xs mx-auto'>
					{response.error || "We couldn't reach the certification database."}
				</p>
			</div>
		);
	}

	return <CertificationManager initialData={response.data ?? []} />;
}
