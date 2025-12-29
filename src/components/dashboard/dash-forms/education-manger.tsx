/** @format */

"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, GraduationCap, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EducationSectionFields } from "./education-form";

export const EducationManager = ({ initialData }: { initialData: any[] }) => {
	const [editingItem, setEditingItem] = useState<any | null>(null);
	const [isAddingNew, setIsAddingNew] = useState(false);

	// Function to go back to the list
	const closeForm = () => {
		setEditingItem(null);
		setIsAddingNew(false);
	};

	if (isAddingNew || editingItem) {
		return (
			<div className='space-y-6'>
				<Button variant='ghost' onClick={closeForm} className='group'>
					<ChevronLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
					Back to Academic History
				</Button>
				<EducationSectionFields initialData={editingItem} />
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h3 className='text-lg font-bold'>Academic History</h3>
					<p className='text-sm text-zinc-500'>
						Manage your degrees and certifications
					</p>
				</div>
				<Button
					onClick={() => setIsAddingNew(true)}
					className='rounded-2xl bg-emerald-600 hover:bg-emerald-700'>
					<Plus className='mr-2' size={18} /> Add Record
				</Button>
			</div>

			<div className='grid gap-4'>
				{initialData.length === 0 && (
					<div className='p-12 border-2 border-dashed rounded-3xl text-center text-zinc-500'>
						No education records added yet.
					</div>
				)}

				{initialData.map((edu) => (
					<div
						key={edu.id}
						className='flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm transition-all hover:shadow-md'>
						<div className='flex items-center gap-4'>
							<div className='p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl'>
								<GraduationCap size={22} />
							</div>
							<div>
								<h4 className='font-bold text-zinc-900 dark:text-zinc-100'>
									{edu.degree}
								</h4>
								<p className='text-sm text-zinc-500'>
									{edu.institution} • {edu.grade}
								</p>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='icon'
								className='rounded-xl'
								onClick={() => setEditingItem(edu)}>
								<Pencil size={16} />
							</Button>
							<Button
								variant='outline'
								size='icon'
								className='rounded-xl text-destructive hover:bg-destructive/10 border-destructive/20'>
								<Trash2 size={16} />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
