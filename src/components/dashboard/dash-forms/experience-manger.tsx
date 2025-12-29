/** @format */

"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Technique, Experience } from "@prisma/client";
import { ExperienceSectionFields } from "./experienc-form";

interface ExperienceManagerProps {
	experiences: (Experience & { techniques: Technique[] })[];
	techniques: Technique[];
}

export const ExperienceManager = ({
	experiences: initialExperiences,
	techniques,
}: ExperienceManagerProps) => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isAddingNew, setIsAddingNew] = useState(false);

	// Filter to find the data of the experience currently being edited
	const activeExperience = initialExperiences.find(
		(exp) => exp.id === editingId,
	);

	if (isAddingNew || editingId) {
		return (
			<div className='space-y-4'>
				<Button
					variant='ghost'
					onClick={() => {
						setEditingId(null);
						setIsAddingNew(false);
					}}>
					← Back to List
				</Button>
				<ExperienceSectionFields
					initialData={activeExperience}
					techniques={techniques}
				/>
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h3 className='text-lg font-semibold'>Saved Milestones</h3>
				<Button onClick={() => setIsAddingNew(true)} className='rounded-2xl'>
					<Plus className='mr-2' size={18} /> Add Experience
				</Button>
			</div>

			<div className='grid gap-4'>
				{initialExperiences.map((exp) => (
					<div
						key={exp.id}
						className='flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl'>
						<div className='flex items-center gap-4'>
							<div className='p-2 bg-blue-500/10 text-blue-500 rounded-xl'>
								<Briefcase size={20} />
							</div>
							<div>
								<h4 className='font-bold'>{exp.role}</h4>
								<p className='text-sm text-zinc-500'>{exp.companyName}</p>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='icon'
								className='rounded-xl'
								onClick={() => setEditingId(exp.id)}>
								<Pencil size={16} />
							</Button>
							{/* You would add a Delete Action here */}
							<Button
								variant='outline'
								size='icon'
								className='rounded-xl text-destructive hover:bg-destructive/10'>
								<Trash2 size={16} />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
