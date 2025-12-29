/** @format */
"use client";

import React, { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { GraduationCap, Save, Loader2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormFieldWrapper } from "@/components/input-form-wrapper";

import { educationSchema, EducationFormValues } from "@/lib/validations";
import { createEducationAction } from "@/app/actions";

interface EducationFieldsProps {
	initialData?: any; // The specific education record or null for "New"
}

export const EducationSectionFields = ({
	initialData,
}: EducationFieldsProps) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<EducationFormValues>({
		resolver: zodResolver(educationSchema) as any,
		defaultValues: {
			// @ts-ignore - Ensure your Zod schema allows 'id' for updates
			id: initialData?.id || undefined,
			institution: initialData?.institution || "",
			degree: initialData?.degree || "",
			fieldOfStudy: initialData?.fieldOfStudy || "",
			startDate: initialData?.startDate
				? new Date(initialData.startDate)
				: new Date(),
			endDate: initialData?.endDate
				? new Date(initialData.endDate)
				: new Date(),
			grade: initialData?.grade || "",
			description: initialData?.description || "",
		},
	});

	// CRITICAL: Resets the form when user switches from "Editing item A" to "Adding New"
	useEffect(() => {
		if (initialData) {
			form.reset({
				...initialData,
				startDate: new Date(initialData.startDate),
				endDate: initialData.endDate
					? new Date(initialData.endDate)
					: new Date(),
			});
		} else {
			form.reset({
				institution: "",
				degree: "",
				fieldOfStudy: "",
				grade: "",
				description: "",
				startDate: new Date(),
				endDate: new Date(),
			});
		}
	}, [initialData, form]);

	const onSubmit = async (values: EducationFormValues) => {
		startTransition(async () => {
			const result = await createEducationAction(values);
			if (result.success) {
				toast.success(
					initialData?.id ? "Academic record updated." : "New record added.",
				);
			} else {
				toast.error(result.error || "Failed to save record.");
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{/* Header Card */}
				<div className='flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800'>
					<div className='flex items-center gap-4'>
						<div className='p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl'>
							<GraduationCap size={24} />
						</div>
						<div>
							<h2 className='text-xl font-bold tracking-tight'>
								{initialData?.id ? "Edit Record" : "New Academic Record"}
							</h2>
							<p className='text-xs text-zinc-500 font-mono uppercase tracking-widest'>
								{initialData?.institution || "Education & Pedagogy"}
							</p>
						</div>
					</div>
					<Button
						disabled={isPending}
						type='submit'
						className='rounded-2xl px-8 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/10'>
						{isPending ? (
							<Loader2 className='animate-spin' size={18} />
						) : (
							<Save className='mr-2' size={18} />
						)}
						{initialData?.id ? "Update Entry" : "Save Entry"}
					</Button>
				</div>

				{/* Form Inputs Grid */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='md:col-span-2'>
						<FormFieldWrapper
							control={form.control}
							name='institution'
							label='Institution Name'>
							{(field) => (
								<Input
									{...field}
									className='h-12 rounded-2xl'
									placeholder='University of Oxford'
								/>
							)}
						</FormFieldWrapper>
					</div>
					<FormFieldWrapper
						control={form.control}
						name='grade'
						label='Grade / GPA'>
						{(field) => (
							<Input
								{...field}
								value={field.value ?? ""}
								className='h-12 rounded-2xl'
								placeholder='1st Class Honours'
							/>
						)}
					</FormFieldWrapper>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='degree'
						label='Degree Level'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl'
								placeholder='Bachelor of Science'
							/>
						)}
					</FormFieldWrapper>
					<FormFieldWrapper
						control={form.control}
						name='fieldOfStudy'
						label='Field of Study'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl'
								placeholder='Computer Science'
							/>
						)}
					</FormFieldWrapper>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='startDate'
						label='Start Date'>
						{(field) => (
							<Input
								type='date'
								{...field}
								value={
									field.value
										? new Date(field.value).toISOString().split("T")[0]
										: ""
								}
								className='h-12 rounded-2xl'
							/>
						)}
					</FormFieldWrapper>
					<FormFieldWrapper
						control={form.control}
						name='endDate'
						label='End Date / Expected'>
						{(field) => (
							<Input
								type='date'
								{...field}
								value={
									field.value
										? new Date(field.value).toISOString().split("T")[0]
										: ""
								}
								className='h-12 rounded-2xl'
							/>
						)}
					</FormFieldWrapper>
				</div>

				<FormFieldWrapper
					control={form.control}
					name='description'
					label='Coursework & Context'>
					{(field) => (
						<Textarea
							{...field}
							value={field.value ?? ""}
							className='min-h-[120px] rounded-3xl p-6'
							placeholder='Describe your modules, honors, or research...'
						/>
					)}
				</FormFieldWrapper>
			</form>
		</Form>
	);
};
