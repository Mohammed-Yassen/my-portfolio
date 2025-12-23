/** @format */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
	ExternalLink,
	Github,
	FolderCode,
	ShieldAlert,
	Zap,
	Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const allProjects = [
	{
		id: 1,
		title: "CyberPulse: IDS Dashboard",
		description:
			"A research-driven Intrusion Detection System that uses Machine Learning to identify network anomalies in real-time. Features a high-performance live monitoring dashboard.",
		image: "/sas.jpg",
		tags: ["Research", "Security"],
		tech: ["Next.js", "Python", "FastAPI", "TensorFlow"],
		github: "https://github.com",
		demo: "https://demo.com",
		category: "AI & Security",
		icon: <ShieldAlert className='w-5 h-5' />,
	},
	{
		id: 2,
		title: "EcoOrder: SaaS Engine",
		description:
			"A full-stack enterprise solution for order management. Includes a complex multi-tenant dashboard, automated invoicing, and real-time inventory tracking.",
		image: "/dash.png",
		tags: ["Full-Stack", "SaaS"],
		tech: ["Next.js", "Supabase", "Prisma", "Tailwind"],
		github: "https://github.com",
		demo: "https://demo.com",
		category: "Web Engineering",
		icon: <Zap className='w-5 h-5' />,
	},
	{
		id: 3,
		title: "NeuralNet Analytics",
		description:
			"An open-source data visualization platform for analyzing academic research datasets. Built to simplify complex data interpretation through interactive 3D charts.",
		image: "/pro.png",
		tags: ["Data Viz", "Research"],
		tech: ["D3.js", "React", "Node.js", "PostgreSQL"],
		github: "https://github.com",
		demo: "https://demo.com",
		category: "Data Science",
		icon: <Globe className='w-5 h-5' />,
	},
	{
		id: 4,
		title: "SecureAuth Pro",
		description:
			"A Zero-Trust authentication library designed for modern web applications, focusing on biometric integration and end-to-end encryption.",
		image: "/pro2.jpg",
		tags: ["Library", "Security"],
		tech: ["TypeScript", "WebAuthn", "Crypto API"],
		github: "https://github.com",
		demo: "https://demo.com",
		category: "Security",
		icon: <FolderCode className='w-5 h-5' />,
	},
];

export const ProjectsSection = () => {
	const [showAll, setShowAll] = useState(false);

	// Show only 3 projects initially, or all if showAll is true
	const displayedProjects = showAll ? allProjects : allProjects.slice(0, 3);

	return (
		<section
			id='projects'
			className='py-24 bg-background relative overflow-hidden'>
			{/* Decorative background element */}
			<div className='absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none' />

			<div className='container mx-auto px-6 md:px-12'>
				{/* Header */}
				<div className='flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left gap-6'>
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
						<span>{allProjects.length} Projects Total</span>
					</div>
				</div>

				{/* Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{displayedProjects.map((project) => (
						<div
							key={project.id}
							className='group relative bg-card border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col'>
							{/* Image Section */}
							<div className='relative h-56 w-full overflow-hidden'>
								<Image
									src={project.image}
									alt={project.title}
									fill
									className='object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale-[20%] group-hover:grayscale-0'
								/>
								<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent' />
								<div className='absolute bottom-4 left-4 flex gap-2'>
									{project.tags.map((tag) => (
										<Badge
											key={tag}
											variant='secondary'
											className='bg-background/80 backdrop-blur-sm border-none shadow-sm'>
											{tag}
										</Badge>
									))}
								</div>
							</div>

							{/* Content Section */}
							<div className='p-6 space-y-4 flex-grow flex flex-col'>
								<div className='flex items-center gap-2'>
									<div className='p-2 rounded-lg bg-primary/10 text-primary'>
										{project.icon}
									</div>
									<span className='text-xs font-bold text-primary tracking-widest uppercase italic'>
										{project.category}
									</span>
								</div>

								<h3 className='text-xl font-bold group-hover:text-primary transition-colors'>
									{project.title}
								</h3>

								<p className='text-sm text-muted-foreground leading-relaxed flex-grow'>
									{project.description}
								</p>

								{/* Tech Stack */}
								<div className='flex flex-wrap gap-1.5 py-2'>
									{project.tech.map((t) => (
										<span
											key={t}
											className='text-[10px] px-2 py-0.5 rounded bg-muted font-medium'>
											{t}
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
										<a href={project.demo} target='_blank'>
											<ExternalLink className='w-4 h-4 mr-2' />
											Live Demo
										</a>
									</Button>
									<Button
										variant='outline'
										size='icon'
										className='rounded-xl'
										asChild>
										<a href={project.github} target='_blank'>
											<Github className='w-4 h-4' />
										</a>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Show More Button */}
				<div className='mt-16 flex justify-center'>
					<Button
						variant='ghost'
						size='lg'
						onClick={() => setShowAll(!showAll)}
						className='group rounded-full px-12 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300'>
						{showAll ? "Show Less" : "Show All Projects"}
						<Zap
							className={`ml-2 h-4 w-4 transition-transform ${
								showAll ? "rotate-180" : "group-hover:scale-125"
							}`}
						/>
					</Button>
				</div>
			</div>
		</section>
	);
};
