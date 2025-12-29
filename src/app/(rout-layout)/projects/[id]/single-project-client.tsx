/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
	Github,
	ExternalLink,
	ArrowLeft,
	Calendar,
	Tag,
	Code2,
	LayoutDashboard,
	Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SingleProjectClient({ project }: { project: any }) {
	// Demo Markdown Content if empty
	const demoContent = `
## The Challenge
Building a scalable architecture that handles real-time data synchronization across multiple client instances.

### Key Features
* **Real-time Sync**: Using WebSockets for sub-100ms latency.
* **Security**: End-to-end encryption for all user data.
* **Performance**: Optimized asset delivery via Global CDN.

> "This project represents a significant leap in how we handle distributed state."
    `;

	return (
		<main className='min-h-screen bg-background pb-20'>
			{/* Hero Header */}
			<div className='relative h-[60vh] w-full overflow-hidden'>
				<Image
					src={project.image}
					alt={project.title}
					fill
					className='object-cover'
					priority
				/>
				<div className='absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent' />

				<div className='container relative h-full flex flex-col justify-end pb-12 px-6'>
					<Link
						href='/projects'
						className='flex items-center gap-2 text-white/80 mb-6 hover:text-primary transition-all w-fit group'>
						<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
						Back to Archive
					</Link>
					<div className='flex items-center gap-3 mb-4'>
						<Badge className='uppercase tracking-widest px-3 py-1'>
							{project.category.replace("_", " ")}
						</Badge>
						{project.isFeatured && (
							<Badge
								variant='outline'
								className='text-white border-white/20 backdrop-blur-md'>
								Featured Work
							</Badge>
						)}
					</div>
					<h1 className='text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight max-w-4xl'>
						{project.title}
					</h1>
				</div>
			</div>

			<div className='container px-6 grid grid-cols-1 lg:grid-cols-3 gap-16 mt-16'>
				{/* Main Content (Left) */}
				<div className='lg:col-span-2 space-y-16'>
					{/* Markdown Description */}
					<section>
						<div className='flex items-center gap-2 mb-6 text-primary'>
							<LayoutDashboard className='w-5 h-5' />
							<h2 className='text-sm font-bold uppercase tracking-wider'>
								Project Documentation
							</h2>
						</div>
						<article className='prose prose-invert prose-primary max-w-none'>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{project.content || demoContent}
							</ReactMarkdown>
						</article>
					</section>

					{/* Jewelry Gallery - Grid Design */}
					{project.gallery && project.gallery.length > 0 && (
						<section className='space-y-8'>
							<div className='flex items-center gap-2 text-primary'>
								<ImageIcon className='w-5 h-5' />
								<h2 className='text-sm font-bold uppercase tracking-wider'>
									Visual Gallery
								</h2>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								{project.gallery.map((img: string, idx: number) => (
									<div
										key={idx}
										className={`relative overflow-hidden rounded-3xl border bg-muted group
                                            ${
																							idx === 0
																								? "md:col-span-2 aspect-16/7"
																								: "aspect-square"
																						}
                                        `}>
										<Image
											src={img}
											alt={`Gallery item ${idx + 1}`}
											fill
											className='object-cover transition-transform duration-700 group-hover:scale-105'
										/>
									</div>
								))}
							</div>
						</section>
					)}
				</div>

				{/* Sidebar (Right) */}
				<aside className='space-y-8'>
					<div className='bg-card border rounded-4xl p-8 shadow-sm sticky top-24'>
						<h3 className='text-xl font-bold mb-8 flex items-center gap-3'>
							<Code2 className='w-5 h-5 text-primary' /> Project Hub
						</h3>

						<div className='flex flex-col gap-4'>
							{project.liveUrl && (
								<Button
									className='w-full h-12 rounded-2xl gap-2 font-bold'
									asChild>
									<a href={project.liveUrl} target='_blank' rel='noreferrer'>
										View Live Site <ExternalLink className='w-4 h-4' />
									</a>
								</Button>
							)}
							{project.repoUrl && (
								<Button
									variant='outline'
									className='w-full h-12 rounded-2xl gap-2 border-primary/20 hover:bg-primary/5'
									asChild>
									<a href={project.repoUrl} target='_blank' rel='noreferrer'>
										Source Repository <Github className='w-4 h-4' />
									</a>
								</Button>
							)}
						</div>

						<div className='mt-10 pt-8 border-t space-y-8'>
							<div>
								<h4 className='text-[10px] uppercase font-black text-muted-foreground mb-4 tracking-[0.2em]'>
									Technologies
								</h4>
								<div className='flex flex-wrap gap-2'>
									{project.techniques?.map((tech: any) => (
										<Badge
											key={tech.id}
											variant='secondary'
											className='rounded-lg px-3 py-1 bg-muted/50 text-xs font-medium border-none'>
											{tech.name}
										</Badge>
									))}
								</div>
							</div>

							<div className='flex justify-between items-end'>
								<div>
									<h4 className='text-[10px] uppercase font-black text-muted-foreground mb-2 tracking-[0.2em]'>
										Completion
									</h4>
									<p className='text-sm font-bold'>
										{new Date(project.updatedAt).toLocaleDateString("en-US", {
											month: "short",
											year: "numeric",
										})}
									</p>
								</div>
								<div className='text-right'>
									<h4 className='text-[10px] uppercase font-black text-muted-foreground mb-2 tracking-[0.2em]'>
										Role
									</h4>
									<p className='text-sm font-bold'>Lead Engineer</p>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</main>
	);
}
