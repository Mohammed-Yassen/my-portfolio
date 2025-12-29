/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/type/projects-type";

export const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<div className='group relative bg-card border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full'>
			{/* Image Section */}
			<div className='relative h-56 w-full overflow-hidden'>
				<Image
					src={project.image}
					alt={project.title}
					fill
					className='object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale-[20%] group-hover:grayscale-0'
				/>
				<div className='absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent' />

				{/* Tags */}
				<div className='absolute bottom-4 left-4 flex flex-wrap gap-2'>
					{project.tags?.map((tag) => (
						<Badge
							key={tag.id}
							variant='secondary'
							className='bg-background/80 backdrop-blur-sm border-none shadow-sm'>
							{tag.name}
						</Badge>
					))}
				</div>
				{/* Featured Badge */}
				{project?.isFeatured && (
					<div className='absolute top-4 right-4'>
						<Badge className='bg-primary text-primary-foreground border-none'>
							Featured
						</Badge>
					</div>
				)}
			</div>

			{/* Content Section */}
			<div className='p-6 space-y-4 grow flex flex-col'>
				<div className='flex items-center gap-2'>
					<Layers className='w-3 h-3 text-primary' />
					<span className='text-xs font-bold text-primary tracking-widest uppercase italic'>
						{project.category.replace("_", " ")}
					</span>
				</div>

				<h3 className='text-xl font-bold group-hover:text-primary transition-colors'>
					{project.title}
				</h3>

				<p className='text-sm text-muted-foreground leading-relaxed grow line-clamp-3'>
					{project.description}
				</p>

				{/* Techniques */}
				<div className='flex flex-wrap gap-1.5 py-2'>
					{project.techniques?.map((t) => (
						<span
							key={t.id}
							className='text-[10px] px-2 py-0.5 rounded bg-muted font-medium'>
							{t.name}
						</span>
					))}
				</div>

				{/* Footer Actions */}
				<div className='pt-4 flex items-center gap-3 border-t'>
					<Button
						variant='default'
						size='sm'
						className='flex-1 rounded-xl shadow-md'
						asChild>
						<Link href={`/projects/${project.id}`}>
							<ArrowRight className='w-4 h-4 mr-2' />
							Details
						</Link>
					</Button>

					{project.liveUrl && (
						<Button
							variant='outline'
							size='icon'
							className='rounded-xl'
							asChild>
							<a
								href={project.liveUrl}
								target='_blank'
								rel='noopener noreferrer'>
								<ExternalLink className='w-4 h-4' />
							</a>
						</Button>
					)}

					{project.repoUrl && (
						<Button
							variant='outline'
							size='icon'
							className='rounded-xl'
							asChild>
							<a
								href={project.repoUrl}
								target='_blank'
								rel='noopener noreferrer'>
								<Github className='w-4 h-4' />
							</a>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
