/** @format */

import { getProjectById } from "@/data";
import { notFound } from "next/navigation";
import { SingleProjectClient } from "./single-project-client";
import { Project } from "@/types/projects-type";

// Next.js 15: params must be treated as a Promise
export default async function ProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// 1. Unwrap the params promise
	const { id } = await params;

	// 2. Fetch data using the unwrapped id
	const project = (await getProjectById(id)) as Project;

	// 3. Handle 404
	if (!project) {
		notFound();
	}

	return <SingleProjectClient project={project} />;
}
