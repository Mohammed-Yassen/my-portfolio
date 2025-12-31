/** @format */

import { getFeaturedProjects } from "@/data";
import { ProjectsListClient } from "./projects-client";
import { Project } from "@/types/projects-type";
import { Suspense } from "react";
import { ProjectsSkeleton } from "@/components/sections/skeleton";

export default async function ProjectsPage() {
	const data = (await getFeaturedProjects()) as Project[];

	return (
		<div className='min-h-screen bg-background'>
			<Suspense fallback={<ProjectsSkeleton />}>
				<ProjectsListClient projectsData={data} />
			</Suspense>
		</div>
	);
}
