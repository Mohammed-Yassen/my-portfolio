/** @format */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowLeft, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card"; // Import here
import { Project } from "@/type/projects-type";

export function ProjectsListClient({
	projectsData,
}: {
	projectsData: Project[];
}) {
	const [search, setSearch] = useState("");
	const [selectedTab, setSelectedTab] = useState("ALL");

	const categories = useMemo(() => {
		return ["ALL", ...Array.from(new Set(projectsData.map((p) => p.category)))];
	}, [projectsData]);

	const filtered = projectsData.filter((p) => {
		const matchesSearch =
			p.title.toLowerCase().includes(search.toLowerCase()) ||
			p.description.toLowerCase().includes(search.toLowerCase());
		const matchesCat = selectedTab === "ALL" || p.category === selectedTab;
		return matchesSearch && matchesCat;
	});

	return (
		<div className='container mx-auto px-6 py-12 md:py-24'>
			<div className='flex flex-col gap-4 mb-12'>
				<Link
					href='/'
					className='flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group'>
					<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
					Back to home
				</Link>
				<h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
					All <span className='text-primary'>Projects</span>
				</h1>
			</div>

			<div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-12'>
				<div className='flex flex-wrap gap-2'>
					{categories.map((cat) => (
						<Button
							key={cat}
							variant={selectedTab === cat ? "default" : "outline"}
							onClick={() => setSelectedTab(cat)}
							className='rounded-full text-xs font-semibold'
							size='sm'>
							{cat.replace("_", " ")}
						</Button>
					))}
				</div>
				<div className='relative w-full md:w-72'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
					<Input
						placeholder='Search projects...'
						className='pl-10 rounded-full bg-muted/50 border-none'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			{filtered.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filtered.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			) : (
				<div className='py-24 text-center'>
					<LayoutGrid className='w-12 h-12 mx-auto text-muted-foreground/20 mb-4' />
					<h2 className='text-xl font-medium'>No projects found</h2>
				</div>
			)}
		</div>
	);
}
