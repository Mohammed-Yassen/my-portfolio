/** @format */

import { getHeroData, getAboutData } from "@/app/data";
import { HeroSectionFields } from "@/components/dashboard/dash-forms/hero-form-fields";
import { AboutSectionFields } from "@/components/dashboard/dash-forms/about-form-fields";

export async function HeroLoader() {
	const data = await getHeroData();
	console.log("hero data in db", data);

	return <HeroSectionFields initialData={data} />;
}

export async function AboutLoader() {
	const data = await getAboutData();
	console.log("about data in db");
	return <AboutSectionFields aboutData={data} />;
}
