/** @format */
import { SkillsSection } from "@/components/sections/skills-section";
import { AboutLoader, HeroLoader } from "./loaders";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CertificationsSection } from "@/components/sections/certification-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSectionForm } from "@/components/sections/contact-section";
import { Footprints } from "lucide-react";
import { Footer } from "@/components/sections/footer";

export default function Home() {
	return (
		<main className='relative bg-background text-foreground min-h-screen selection:bg-primary/30 pb-16 md:pb-24 '>
			{/* Global background effects */}
			<div
				className='absolute inset-0 z-0 opacity-[0.05] space-y-24'
				style={{
					backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
					backgroundSize: "3rem 3rem",
				}}
			/>
			<HeroLoader />
			<AboutLoader />
			<SkillsSection />
			<ProjectsSection />
			<ExperienceSection />
			<CertificationsSection />
			<BlogSection />
			<ContactSectionForm />
			<Footer />
		</main>
	);
}
