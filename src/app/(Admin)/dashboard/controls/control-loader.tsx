/** @format */

import {
	getHeroData,
	getAboutData,
	getSkillData,
	getEducation,
	getExperiences,
	getAllTechniques,
} from "@/app/data";
import { HeroSectionFields } from "@/components/dashboard/dash-forms/hero-form-fields";
import { AboutSectionFields } from "@/components/dashboard/dash-forms/about-form-fields";

import { EducationSectionFields } from "@/components/dashboard/dash-forms/education-form";
import { ExperienceManager } from "@/components/dashboard/dash-forms/experience-manger";
import { EducationManager } from "@/components/dashboard/dash-forms/education-manger";

export async function HeroLoader() {
	const data = await getHeroData();

	return <HeroSectionFields initialData={data} />;
}

export async function AboutLoader() {
	const data = await getAboutData();
	console.log("about data in db", data);
	return <AboutSectionFields aboutData={data} />;
}
/** @format */
// In your control-loader.tsx or similar file

export async function ExperienceLoader() {
	// 1. Fetch current experiences and the list of all possible techniques
	const [experiences, allTechniques] = await Promise.all([
		getExperiences(),
		getAllTechniques(), // You need to add this to your data.ts
	]);

	// Note: If you want to handle "Adding New",
	// you might want to wrap this in a list view first.
	// For now, let's pass the techniques to the fields.
	return (
		<ExperienceManager
			experiences={experiences} // Pass the first one for now or map them
			techniques={allTechniques}
		/>
	);
}

export async function EducationLoader() {
	const data = await getEducation();
	return <EducationManager initialData={data} />;
}
