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
	Sparkles,
	Loader2,
	BarChart3,
	TextQuote,
} from "lucide-react";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AboutFormValues, aboutSchema } from "@/lib/validations";
import { FullAboutSection } from "@/type";
import { FormFieldWrapper } from "@/components/input-form-wrapper";
import { IconPicker } from "../icon-picker";
import { cn } from "@/lib/utils"; // Ensure you have the cn utility
import { updateAboutAction } from "@/app/actions";

interface AboutSectionFieldsProps {
	aboutData: FullAboutSection | null;
}

export const AboutSectionFields = ({ aboutData }: AboutSectionFieldsProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	console.log("about data");
	console.log(aboutData);

	const form = useForm<AboutFormValues>({
		resolver: zodResolver(aboutSchema) as any,
		defaultValues: {
			title: aboutData?.title || "Building the Next Generation",
			subtitle:
				aboutData?.subtitle || "BRIDGING THE GAP BETWEEN LOGIC AND EXPERIENCE",
			description:
				aboutData?.description ||
				"I specialize in architecting solutions that aren't just functional—they're smart.",
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='max-w-6xl mx-auto px-4 space-y-12 pb-40 pt-10'>
				{/* 1. MAIN NARRATIVE SECTION */}
				<section className='relative overflow-hidden bg-white dark:bg-zinc-950 p-6 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800/50 shadow-2xl shadow-zinc-200/50 dark:shadow-none'>
					<div className='absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none'>
						<ShieldCheck size={120} />
					</div>

					<div className='flex items-center gap-4 mb-12'>
						<div className='p-4 bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400'>
							<ShieldCheck size={28} />
						</div>
						<div>
							<h3 className='font-black text-2xl tracking-tight text-zinc-900 dark:text-white'>
								Narrative Core
							</h3>
							<p className='text-sm text-zinc-500 font-medium'>
								Define your professional identity and vision.
							</p>
						</div>
					</div>

					<div className='grid gap-10 relative z-10'>
						<FormFieldWrapper
							control={form.control}
							name='title'
							label='Main Heading'>
							{(field) => (
								<Input
									{...field}
									placeholder='Enter Main Title...'
									className='h-16 text-xl md:text-3xl font-black bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-2xl focus-visible:ring-blue-500/20'
								/>
							)}
						</FormFieldWrapper>

						<FormFieldWrapper
							control={form.control}
							name='subtitle'
							label='Subheading'>
							{(field) => (
								<Input
									{...field}
									className='h-14 text-lg font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-2xl'
								/>
							)}
						</FormFieldWrapper>

						<FormFieldWrapper
							control={form.control}
							name='description'
							label='Biography'>
							{(field) => (
								<div className='relative group'>
									<Textarea
										{...field}
										className='min-h-62.5 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-[2rem] leading-relaxed resize-none p-8 text-lg'
									/>
									<TextQuote
										className='absolute bottom-8 right-8 text-zinc-200 dark:text-zinc-800 group-focus-within:text-blue-500/20 transition-colors'
										size={48}
									/>
								</div>
							)}
						</FormFieldWrapper>
					</div>
				</section>

				{/* 2. IMPACT METRICS */}
				<section className='space-y-8'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-4'>
						<div className='space-y-1'>
							<div className='flex items-center gap-2 text-orange-500'>
								<BarChart3 size={20} />
								<h3 className='font-black text-sm uppercase tracking-widest'>
									Impact Metrics
								</h3>
							</div>
							<p className='text-xs text-zinc-500'>
								Quantifiable achievements and statistics.
							</p>
						</div>
						<Button
							type='button'
							variant='outline'
							onClick={() =>
								appendStatus({ label: "", value: "", isActive: true })
							}
							className='w-full md:w-auto rounded-xl font-bold h-11 px-6 border-zinc-200 dark:border-zinc-800 hover:bg-orange-500 hover:text-white transition-all shadow-sm'>
							<Plus size={16} className='mr-2' /> ADD METRIC
						</Button>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
						{statusFields.map((field, index) => (
							<div
								key={field.id}
								className='group relative p-8 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] transition-all hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 dark:hover:bg-zinc-900'>
								<button
									type='button'
									onClick={() => removeStatus(index)}
									className='absolute -top-2 -right-2 p-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white z-20'>
									<Trash2 size={14} />
								</button>
								<FormFieldWrapper
									control={form.control}
									name={`statuses.${index}.value`}
									label='Value'>
									{(innerField) => (
										<Input
											{...innerField}
											placeholder='3+'
											className='h-12 p-0 bg-transparent border-none text-4xl font-black focus-visible:ring-0'
										/>
									)}
								</FormFieldWrapper>
								<FormFieldWrapper
									control={form.control}
									name={`statuses.${index}.label`}
									label='Label'>
									{(innerField) => (
										<Input
											{...innerField}
											placeholder='Clients'
											className='h-6 p-0 bg-transparent border-none text-xs font-bold text-zinc-400 uppercase tracking-tighter focus-visible:ring-0'
										/>
									)}
								</FormFieldWrapper>
							</div>
						))}
					</div>
				</section>

				{/* 3. VALUE PILLARS */}
				<section className='space-y-8'>
					<div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-4'>
						<div className='space-y-1'>
							<div className='flex items-center gap-2 text-emerald-500'>
								<Layers size={20} />
								<h3 className='font-black text-sm uppercase tracking-widest'>
									Value Pillars
								</h3>
							</div>
							<p className='text-xs text-zinc-500'>
								The core principles that drive your work.
							</p>
						</div>
						<Button
							type='button'
							variant='outline'
							onClick={() =>
								appendPillar({ title: "", description: "", icon: "Zap" })
							}
							className='w-full md:w-auto rounded-xl font-bold h-11 px-6 border-zinc-200 dark:border-zinc-800 hover:bg-emerald-500 hover:text-white transition-all shadow-sm'>
							<Plus size={16} className='mr-2' /> ADD PILLAR
						</Button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{pillarFields.map((field, index) => (
							<div
								key={field.id}
								className='group relative p-8 md:p-10 bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] transition-all hover:bg-white dark:hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-emerald-500/5'>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									onClick={() => removePillar(index)}
									className='absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500'>
									<Trash2 size={20} />
								</Button>

								<div className='space-y-8'>
									<div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
										<div className='p-4 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-2xl ring-1 ring-emerald-500/20'>
											<IconPicker
												value={form.watch(`corePillars.${index}.icon`) || "Zap"}
												onChange={(v) =>
													form.setValue(`corePillars.${index}.icon`, v)
												}
											/>
										</div>
										<div className='flex-1 w-full'>
											<FormFieldWrapper
												control={form.control}
												name={`corePillars.${index}.title`}
												label='Pillar Title'>
												{(innerField) => (
													<Input
														{...innerField}
														placeholder='e.g. Scalable Strategy'
														className='h-12 p-0 bg-transparent border-none text-2xl font-black focus-visible:ring-0'
													/>
												)}
											</FormFieldWrapper>
										</div>
									</div>
									<FormFieldWrapper
										control={form.control}
										name={`corePillars.${index}.description`}
										label='Pillar Mission'>
										{(innerField) => (
											<Textarea
												{...innerField}
												placeholder='Describe the impact of this pillar...'
												className='min-h-25 p-0 bg-transparent border-none text-base text-zinc-500 dark:text-zinc-400 resize-none focus-visible:ring-0 leading-relaxed'
											/>
										)}
									</FormFieldWrapper>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* FLOATING SAVE BAR */}
				<div className='fixed bottom-8 left-0 right-0 flex justify-center z-100 px-4 pointer-events-none'>
					<div className='w-full max-w-lg pointer-events-auto'>
						<Button
							disabled={isPending}
							type='submit'
							className='w-full h-16 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-[1.03] active:scale-[0.97] transition-all gap-4 border-none text-lg group overflow-hidden'>
							{isPending ? (
								<Loader2 className='animate-spin h-6 w-6' />
							) : (
								<Zap
									size={22}
									className='fill-current group-hover:animate-bounce'
								/>
							)}
							{isPending ? "SYNCHRONIZING..." : "SAVE PHILOSOPHY"}
							<div className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none' />
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};
