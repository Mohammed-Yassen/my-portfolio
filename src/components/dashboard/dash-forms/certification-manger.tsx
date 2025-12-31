/** @format */
"use client";

import React, { useState, useTransition } from "react";
import {
	Plus,
	Pencil,
	Trash2,
	Award,
	ChevronLeft,
	Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Certification } from "@prisma/client";

import { toast } from "sonner";
import { deleteCertification } from "@/actions";
import { CertificationSectionFields } from "./certification-section-fields";

export const CertificationManager = ({
	initialData,
}: {
	initialData: Certification[];
}) => {
	const [editingItem, setEditingItem] = useState<Certification | null>(null);
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [isPending, startTransition] = useTransition();

	const closeForm = () => {
		setEditingItem(null);
		setIsAddingNew(false);
	};

	const onDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this certification?")) return;

		startTransition(async () => {
			try {
				await deleteCertification(id);
				toast.success("Certification deleted");
			} catch (error) {
				toast.error("Failed to delete");
			}
		});
	};

	if (isAddingNew || editingItem) {
		return (
			<div className='space-y-6'>
				<Button variant='ghost' onClick={closeForm} className='group'>
					<ChevronLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
					Back to List
				</Button>
				<CertificationSectionFields initialData={editingItem} />
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h3 className='text-lg font-bold'>Certifications</h3>
					<p className='text-sm text-zinc-500'>
						Manage your professional achievements
					</p>
				</div>
				<Button
					onClick={() => setIsAddingNew(true)}
					className='rounded-2xl bg-amber-600 hover:bg-amber-700'>
					<Plus className='mr-2' size={18} /> Add Certification
				</Button>
			</div>

			<div className='grid gap-4'>
				{initialData.length === 0 && (
					<div className='p-12 border-2 border-dashed rounded-3xl text-center text-zinc-500'>
						No certifications added yet.
					</div>
				)}

				{initialData.map((cert) => (
					<div
						key={cert.id}
						className='flex items-center justify-between p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm transition-all hover:shadow-md'>
						<div className='flex items-center gap-4'>
							<div className='p-3 bg-amber-500/10 text-amber-600 rounded-2xl'>
								<Award size={22} />
							</div>
							<div>
								<h4 className='font-bold text-zinc-900 dark:text-zinc-100'>
									{cert.title}
								</h4>
								<p className='text-sm text-zinc-500'>
									{cert.issuer} • {cert.issueDate}
								</p>
							</div>
						</div>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								size='icon'
								className='rounded-xl'
								onClick={() => setEditingItem(cert)}>
								<Pencil size={16} />
							</Button>
							<Button
								variant='outline'
								size='icon'
								disabled={isPending}
								onClick={() => onDelete(cert.id)}
								className='rounded-xl text-destructive hover:bg-destructive/10 border-destructive/20'>
								{isPending ? (
									<Loader2 className='animate-spin' size={16} />
								) : (
									<Trash2 size={16} />
								)}
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
