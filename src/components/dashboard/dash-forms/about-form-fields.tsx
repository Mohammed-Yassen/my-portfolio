/** @format */
"use client";

import React, { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Plus,
	Trash2,
	ShieldCheck,
	Zap,
	Layers,
	Loader2,
	BarChart3,
	TextQuote,
	Info,
} from "lucide-react";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AboutFormValues, aboutSchema } from "@/lib/validations";
import { FullAboutSection } from "@/types";
import { FormFieldWrapper } from "@/components/input-form-wrapper";
import { IconPicker } from "../icon-picker";
import { cn } from "@/lib/utils";
import { updateAboutAction } from "@/actions";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface AboutSectionFieldsProps {
	aboutData: FullAboutSection | null;
}

export const AboutSectionFields = ({ aboutData }: AboutSectionFieldsProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<AboutFormValues>({
		resolver: zodResolver(aboutSchema) as any,
		defaultValues: {
			title: aboutData?.title || "Building the Next Generation",
			subtitle:
				aboutData?.subtitle || "BRIDGING THE GAP BETWEEN LOGIC AND EXPERIENCE",
			description:
				aboutData?.description || "I specialize in architecting solutions...",
			corePillars: aboutData?.corePillars || [],
			statuses: aboutData?.statuses || [],
		},
	});

	const {
		fields: pillarFields,
		append: appendPillar,
		remove: removePillar,
	} = useFieldArray({ control: form.control, name: "corePillars" });

	const {
		fields: statusFields,
		append: appendStatus,
		remove: removeStatus,
	} = useFieldArray({ control: form.control, name: "statuses" });

	const onSubmit = async (values: AboutFormValues) => {
		startTransition(async () => {
			try {
				await updateAboutAction(values);
				toast.success("Philosophy Synchronized");
				router.refresh();
			} catch (error) {
				toast.error("Critical Sync Error");
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-16 pb-32'>
				{/* 1. NARRATIVE COMMAND CENTER */}
				<div className='relative group'>
					{/* <div className='absolute -inset-1 bg-linear-to-r from-blue-500/20 to-indigo-500/20 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000'></div> */}
					<section className='relative '>
						<div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
							<div className='flex items-center gap-5'>
								<div className='p-4 bg-zinc-900 dark:bg-white rounded-2xl'>
									<ShieldCheck
										className='text-white dark:text-black'
										size={24}
									/>
								</div>
								<div>
									<h2 className='text-2xl font-black tracking-tight'>
										Narrative Core
									</h2>
									<p className='text-zinc-500 font-medium'>
										Your professional manifesto.
									</p>
								</div>
							</div>
						</div>

						<div className='space-y-10'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								<FormFieldWrapper
									control={form.control}
									name='title'
									label='Primary Heading'>
									{(field) => (
										<Input
											{...field}
											className='h-14 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl font-bold '
										/>
									)}
								</FormFieldWrapper>
								<FormFieldWrapper
									control={form.control}
									name='subtitle'
									label='Strategic Subtitle'>
									{(field) => (
										<Input
											{...field}
											className='h-14 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl font-medium'
										/>
									)}
								</FormFieldWrapper>
							</div>

							<FormFieldWrapper
								control={form.control}
								name='description'
								label='The Biography'>
								{(field) => (
									<div className='relative'>
										<Textarea
											{...field}
											className='min-h-48 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 leading-relaxed resize-none'
										/>
										<TextQuote
											className='absolute bottom-6 right-6 text-zinc-200 dark:text-zinc-800'
											size={28}
										/>
									</div>
								)}
							</FormFieldWrapper>
						</div>
					</section>
				</div>

				{/* 2. IMPACT METRICS (STATS) */}
				<section className='space-y-8 px-2'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='p-2 bg-orange-500/10 rounded-lg text-orange-600'>
								<BarChart3 size={20} />
							</div>
							<h3 className='font-bold text-lg tracking-tight'>
								Impact Metrics
							</h3>
						</div>
						<Button
							type='button'
							variant='secondary'
							onClick={() =>
								appendStatus({ label: "", value: "", isActive: true })
							}
							className='rounded-full font-bold bg-white dark:bg-zinc-800 border shadow-sm hover:scale-105 transition-transform'>
							<Plus size={16} className='mr-2' /> Add Metric
						</Button>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{statusFields.map((field, index) => (
							<div
								key={field.id}
								className='group relative p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl transition-all hover:ring-2 hover:ring-orange-500/50 shadow-sm'>
								<button
									type='button'
									onClick={() => removeStatus(index)}
									className='absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg'>
									<Trash2 size={12} />
								</button>
								<div className='space-y-2'>
									<FormFieldWrapper
										control={form.control}
										name={`statuses.${index}.value`}
										label=''>
										{(innerField) => (
											<Input
												{...innerField}
												placeholder='00'
												className='h-auto p-0 bg-transparent border-none t font-black focus-visible:ring-0 placeholder:opacity-20 text-orange-500'
											/>
										)}
									</FormFieldWrapper>
									<FormFieldWrapper
										control={form.control}
										name={`statuses.${index}.label`}
										label=''>
										{(innerField) => (
											<Input
												{...innerField}
												placeholder='Metric Label'
												className='h-auto p-0 bg-transparent border-none  uppercase font-bold tracking-widest text-zinc-400 focus-visible:ring-0'
											/>
										)}
									</FormFieldWrapper>
								</div>
							</div>
						))}
					</div>
				</section>

				<Separator className='bg-zinc-200 dark:bg-zinc-800' />

				{/* 3. VALUE PILLARS (CORE PRINCIPLES) */}
				<section className='space-y-8 px-2'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div className='p-2 bg-emerald-500/10 rounded-lg text-emerald-600'>
								<Layers size={20} />
							</div>
							<h3 className='font-bold text-xl tracking-tight'>Core Pillars</h3>
						</div>
						<Button
							type='button'
							variant='secondary'
							onClick={() =>
								appendPillar({ title: "", description: "", icon: "Zap" })
							}
							className='rounded-full font-bold bg-white dark:bg-zinc-800 border shadow-sm hover:scale-105 transition-transform'>
							<Plus size={16} className='mr-2' /> Add Pillar
						</Button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{pillarFields.map((field, index) => (
							<div
								key={field.id}
								className='group relative p-4 bg-zinc-100/30 dark:bg-zinc-900/30 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-[2.5rem] transition-all hover:bg-white dark:hover:bg-zinc-900 hover:border-solid hover:shadow-xl'>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									onClick={() => removePillar(index)}
									className='absolute top-0 right-2 opacity-0 group-hover:opacity-100 transition-all rounded-full hover:bg-red-50 text-red-500'>
									<Trash2 size={18} />
								</Button>

								<div className='flex flex-col gap-6'>
									<div className='flex items-center gap-4'>
										<div className='shrink-0  bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700'>
											<IconPicker
												value={form.watch(`corePillars.${index}.icon`) || "Zap"}
												onChange={(v) =>
													form.setValue(`corePillars.${index}.icon`, v)
												}
											/>
										</div>
										<FormFieldWrapper
											control={form.control}
											name={`corePillars.${index}.title`}
											label=''>
											{(innerField) => (
												<Input
													{...innerField}
													placeholder='Pillar Title'
													className='h-auto p-2 border border-gray-50 bg-transparent font-bold focus-visible:ring-0'
												/>
											)}
										</FormFieldWrapper>
									</div>
									<FormFieldWrapper
										control={form.control}
										name={`corePillars.${index}.description`}
										label=''>
										{(innerField) => (
											<Textarea
												{...innerField}
												placeholder='Describe this core principle...'
												className='min-h-20 p-3 bg-transparent border border-l border-gray-50  text-zinc-500 dark:text-zinc-400 resize-none focus-visible:ring-0 rounded-2xl  leading-relaxed'
											/>
										)}
									</FormFieldWrapper>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* FLOATING ACTION CONSOLE */}
				<div className='fixed bottom-10 right-0  z-50 w-full max-w-md px-6'>
					<div className='relative group'>
						<div className='absolute -inset-1  rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500'></div>
						<Button
							disabled={isPending}
							type='submit'
							size='lg'
							className='relative rounded-2xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-black text-lg shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 overflow-hidden border-none'>
							{isPending ? (
								<Loader2 className='animate-spin' size={24} />
							) : (
								<Zap size={22} className='fill-current' />
							)}
							{isPending ? "SYNCHRONIZING..." : "SYNC PHILOSOPHY"}

							{/* Shimmer Effect */}
							<div className='absolute inset-0 bg-white/10 -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none' />
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
