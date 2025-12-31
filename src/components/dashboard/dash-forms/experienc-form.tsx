/** @format */
"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Briefcase,
	Calendar,
	MapPin,
	Save,
	Loader2,
	Plus,
	Trash2,
} from "lucide-react";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { experienceSchema, ExperienceFormValues } from "@/lib/validations";
import { FormFieldWrapper } from "@/components/input-form-wrapper";
import { Technique } from "@prisma/client";
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
	MultiSelectValue,
} from "@/components/ui/multi-select"; // Assuming a Shadcn multi-select component
import { createExperienceAction } from "@/actions";

interface ExperienceFieldsProps {
	initialData?: any;
	techniques?: Technique[];
	// onSubmitAction: (values: ExperienceFormValues) => Promise<any>;
}

export const ExperienceSectionFields = ({
	initialData,
	techniques,
}: ExperienceFieldsProps) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<ExperienceFormValues>({
		resolver: zodResolver(experienceSchema) as any,
		defaultValues: {
			companyName: initialData?.companyName || "",
			role: initialData?.role || "",
			location: initialData?.location || "",
			startDate: initialData?.startDate
				? new Date(initialData.startDate)
				: new Date(),
			endDate: initialData?.endDate ? new Date(initialData.endDate) : null,
			description: initialData?.description || "",
			techniques: initialData?.techniques?.map((t: any) => t.id) || [],
		},
	});

	const onSubmit = async (values: ExperienceFormValues) => {
		startTransition(async () => {
			const result = await createExperienceAction(values);
			if (result.success) toast.success("Career milestone recorded.");
			else toast.error(result.error || "Failed to save experience.");
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{/* Header Card */}
				<div className='flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800'>
					<div className='flex items-center gap-4'>
						<div className='p-3 bg-blue-500/10 text-blue-500 rounded-2xl'>
							<Briefcase size={24} />
						</div>
						<div>
							<h2 className='text-xl font-bold tracking-tight'>
								Experience Details
							</h2>
							<p className='text-xs text-zinc-500 font-mono uppercase tracking-widest'>
								Professional History
							</p>
						</div>
					</div>
					<Button
						disabled={isPending}
						type='submit'
						className='rounded-2xl px-8 shadow-xl shadow-blue-500/10'>
						{isPending ? (
							<Loader2 className='animate-spin' size={18} />
						) : (
							<Save className='mr-2' size={18} />
						)}
						Save Entry
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='companyName'
						label='Company / Organization'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl bg-white dark:bg-zinc-900'
								placeholder='e.g. OpenAI'
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='role'
						label='Your Role'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl bg-white dark:bg-zinc-900'
								placeholder='e.g. Senior Software Engineer'
							/>
						)}
					</FormFieldWrapper>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='location'
						label='Location'>
						{(field) => (
							<div className='relative'>
								<MapPin
									className='absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400'
									size={16}
								/>
								<Input
									{...field}
									value={field.value ?? ""}
									className='h-12 pl-11 rounded-2xl'
									placeholder='San Francisco, CA'
								/>
							</div>
						)}
					</FormFieldWrapper>

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
						label='End Date (Leave blank if Present)'>
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
					name='techniques'
					label='Stack & Techniques Used'>
					{(field) => (
						<MultiSelect
							onValuesChange={field.onChange}
							values={field.value || []} // Use 'values' for controlled components
						>
							{/* 1. The Trigger button that opens the popover */}
							<MultiSelectTrigger className='w-full'>
								{/* 2. Displays selected tags and handle overflow */}
								<MultiSelectValue placeholder='Select technologies...' />
							</MultiSelectTrigger>

							{/* 3. The dropdown content (Search + List) */}
							<MultiSelectContent
								search={{ placeholder: "Search techniques..." }}>
								<MultiSelectGroup>
									{techniques?.map((t) => (
										<MultiSelectItem key={t.id} value={t.id}>
											{t.name}
										</MultiSelectItem>
									))}
								</MultiSelectGroup>
							</MultiSelectContent>
						</MultiSelect>
					)}
				</FormFieldWrapper>

				<FormFieldWrapper
					control={form.control}
					name='description'
					label='Achievements & Context'>
					{(field) => (
						<Textarea
							{...field}
							value={field.value ?? ""}
							className='min-h-37.5 rounded-3xl p-6'
							placeholder='Describe your impact and responsibilities...'
						/>
					)}
				</FormFieldWrapper>
			</form>
		</Form>
	);
};
