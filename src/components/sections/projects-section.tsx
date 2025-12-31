/** @format */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for internal navigation
import {
	ExternalLink,
	Github,
	FolderCode,
	ShieldAlert,
	Zap,
	Globe,
	ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/projects-type";
import { ProjectCard } from "../project-card";

interface ProjectFormProps {
	projectsData: Project[];
}

export const ProjectsSection = ({ projectsData }: ProjectFormProps) => {
	// Show only first 3 on the landing page
	const featuredProjects = projectsData?.slice(0, 3);

	return (
		<section
			id='projects'
			className='py-24 bg-background relative overflow-hidden'>
			<div className='container mx-auto px-6 md:px-12'>
				<div className='flex flex-col md:flex-row justify-between items-center mb-16'>
					<div className='space-y-3'>
						<h2 className='text-4xl font-bold tracking-tight'>
							Featured <span className='text-primary'>Projects</span>
						</h2>
						<p className='text-muted-foreground max-w-xl text-lg'>
							A collection of systems bridging the gap between theoretical
							research and scalable engineering.
						</p>
					</div>
					<div className='flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border'>
						<FolderCode className='w-4 h-4 text-primary' />
						<span>{projectsData?.length || 0} Projects Total</span>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{featuredProjects?.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>

				<div className='mt-16 flex flex-col items-center gap-4'>
					<Button
						asChild
						size='lg'
						className='group rounded-full px-12 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300'>
						<Link href='/projects'>
							View All Projects
							<Zap className='ml-2 h-4 w-4 group-hover:scale-125 transition-transform' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};
