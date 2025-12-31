/** @format */
import { Suspense } from "react";
import {
	AboutLoader,
	BlogsLoader,
	CertificationsLoader,
	ExperianceAndEducationLoader,
	HeroLoader,
	ProjectsLoader,
	SkillsLoader,
	TestimonialsLoader,
} from "./loaders";
import { ContactSectionForm } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";

import {
	HeroSkeleton,
	AboutSkeleton,
	SkillsSkeleton,
	ProjectsSkeleton,
	BlogSkeleton,
	CertificationsSkeleton,
	ExperienceEducationSkeleton,
	TestimonialsSkeleton,
} from "@/components/sections/skeleton";
import { HomeClientWrapper } from "./home-client-wrapper";

export default function Home() {
	return (
		// The Client Wrapper handles the background and mounting logic
		<HomeClientWrapper>
			<Suspense fallback={<HeroSkeleton />}>
				<HeroLoader />
			</Suspense>

			<Suspense fallback={<AboutSkeleton />}>
				<AboutLoader />
			</Suspense>

			<Suspense fallback={<SkillsSkeleton />}>
				<SkillsLoader />
			</Suspense>

			<Suspense fallback={<ProjectsSkeleton />}>
				<ProjectsLoader />
			</Suspense>
			<Suspense fallback={<TestimonialsSkeleton />}>
				<TestimonialsLoader />
			</Suspense>

			<Suspense fallback={<ExperienceEducationSkeleton />}>
				<ExperianceAndEducationLoader />
			</Suspense>

			<Suspense fallback={<CertificationsSkeleton />}>
				<CertificationsLoader />
			</Suspense>

			<Suspense fallback={<BlogSkeleton />}>
				<BlogsLoader />
			</Suspense>

			<ContactSectionForm />
			<Footer />
		</HomeClientWrapper>
	);
}
