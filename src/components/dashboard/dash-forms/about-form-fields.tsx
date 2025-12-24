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
} from "lucide-react";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AboutFormSchema, aboutSchema } from "@/lib/validations";
import { AboutWithRelations } from "@/type";
import { UpdateAboutSection } from "@/app/actions";
import { useRouter } from "next/navigation";

interface AboutSectionFieldsProps {
	aboutData: AboutWithRelations | null;
}

export const AboutSectionFields = ({ aboutData }: AboutSectionFieldsProps) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	// 1. Initialize Form with strict typing
	const form = useForm<AboutFormSchema>({
		resolver: zodResolver(aboutSchema) as any,
		defaultValues: {
			title: aboutData?.title || "What I Do ?",
			subtitle: aboutData?.subtitle || "A Hybrid Approach to Problem Solving",
			description: aboutData?.description || "",
			corePillars: aboutData?.corePillars || [],
			statuses: aboutData?.statuses || [],
		},
	});

	// 2. Manage Dynamic Lists
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

	// 3. Senior Level Submit Handler
	const onSubmit = async (values: AboutFormSchema) => {
		startTransition(async () => {
			try {
				const result = await UpdateAboutSection(values);

				if (result?.success) {
					toast.success("Philosophy Synchronized", {
						description:
							"Your professional narrative has been updated successfully.",
					});
					router.refresh();
				} else {
					// Handle specific server-side errors
					toast.error("Sync Failed", {
						description:
							typeof result?.error === "string"
								? result.error
								: "Check your connection and try again.",
					});
				}
			} catch (error) {
				console.error("Critical Submission Error:", error);
				toast.error("Internal Server Error", {
					description:
						"An unexpected error occurred. Logs are available in console.",
				});
			}
		});
	};

	// 4. Validation Error Handler (The Experience Addition)
	const onValidationError = (errors: any) => {
		console.warn("Form Validation Errors:", errors);

		// Logic to tell the user exactly what's wrong
		const errorKeys = Object.keys(errors);
		if (errorKeys.length > 0) {
			const firstError = errorKeys[0];
			toast.error("Validation Error", {
				description: `Please check the ${firstError} section. All fields are required.`,
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onValidationError)}
				className='space-y-12 pb-20'>
				{/* 1. MAIN NARRATIVE SECTION */}
				<section className='bg-white dark:bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm'>
					<div className='flex items-center gap-3 mb-8'>
						<div className='p-2 bg-blue-500/10 rounded-lg'>
							<ShieldCheck className='text-blue-600' size={20} />
						</div>
						<h3 className='font-bold text-lg uppercase tracking-tight'>
							Narrative Core
						</h3>
					</div>

					<div className='space-y-6'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400'>
										Main Heading
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='titel'
											className='h-12 text-xl font-bold bg-zinc-50/50 dark:bg-zinc-900/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20'
										/>
									</FormControl>
									<FormMessage className='text-[10px] font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subtitle'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400'>
										sub titel
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Who are you professionally?'
											className='h-12 text-xl font-bold bg-zinc-50/50 dark:bg-zinc-900/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20'
										/>
									</FormControl>
									<FormMessage className='text-[10px] font-bold' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400'>
										Biography
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Your journey, expertise, and vision...'
											className='min-h-40 bg-zinc-50/50 dark:bg-zinc-900/50 border-none rounded-2xl leading-relaxed resize-none p-4'
										/>
									</FormControl>
									<FormMessage className='text-[10px] font-bold' />
								</FormItem>
							)}
						/>
					</div>
				</section>

				{/* 2. DYNAMIC IMPACT METRICS */}
				<section className='space-y-4'>
					<div className='flex justify-between items-center px-2'>
						<div className='flex items-center gap-2'>
							<BarChart3 size={18} className='text-orange-500' />
							<h3 className='font-bold text-sm uppercase tracking-widest'>
								Impact Metrics
							</h3>
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								appendStatus({ label: "", value: "", isActive: true })
							}
							className='rounded-full text-[10px] font-black h-8 px-4 border-dashed'>
							<Plus size={14} className='mr-1' /> ADD METRIC
						</Button>
					</div>

					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{statusFields.map((field, index) => (
							<div
								key={field.id}
								className='group relative p-4 space-y-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all hover:ring-2 hover:ring-orange-500/20'>
								<button
									type='button'
									onClick={() => removeStatus(index)}
									className='absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg'>
									<Trash2 size={10} />
								</button>
								<FormField
									control={form.control}
									name={`statuses.${index}.value`}
									render={({ field }) => (
										<Input
											{...field}
											placeholder='e.g., 3+'
											className='h-8 p-0 bg-transparent border-none text-xl font-black focus-visible:ring-0 placeholder:text-zinc-300'
										/>
									)}
								/>
								<FormField
									control={form.control}
									name={`statuses.${index}.label`}
									render={({ field }) => (
										<Input
											{...field}
											placeholder='Label'
											className='h-4 p-0 bg-transparent border-none text-[10px] uppercase font-bold text-zinc-500 focus-visible:ring-0 placeholder:text-zinc-400'
										/>
									)}
								/>
							</div>
						))}
					</div>
					{statusFields.length === 0 && (
						<p className='text-center text-[10px] text-zinc-400 font-medium py-4'>
							No metrics added yet.
						</p>
					)}
				</section>

				{/* 3. CORE PILLARS SECTION */}
				<section className='space-y-6'>
					<div className='flex justify-between items-center px-2'>
						<div className='flex items-center gap-2'>
							<Layers size={18} className='text-emerald-500' />
							<h3 className='font-bold text-sm uppercase tracking-widest'>
								Value Pillars
							</h3>
						</div>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() =>
								appendPillar({ title: "", description: "", icon: "Zap" })
							}
							className='rounded-full text-[10px] font-black h-8 px-4 border-dashed'>
							<Plus size={14} className='mr-1' /> ADD PILLAR
						</Button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{pillarFields.map((field, index) => (
							<div
								key={field.id}
								className='group relative p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] hover:shadow-xl hover:shadow-emerald-500/5 transition-all'>
								<Button
									type='button'
									variant='ghost'
									size='icon'
									onClick={() => removePillar(index)}
									className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20'>
									<Trash2 size={16} />
								</Button>

								<div className='flex flex-col gap-4'>
									<div className='flex items-center gap-3'>
										<div className='flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 px-3 rounded-xl'>
											<Sparkles size={14} className='text-zinc-500' />
											<FormField
												control={form.control}
												name={`corePillars.${index}.icon`}
												render={({ field }) => (
													<input
														{...field}
														placeholder='Icon name'
														className='bg-transparent border-none text-[10px] font-mono w-20 focus:outline-none placeholder:text-zinc-400'
													/>
												)}
											/>
										</div>
										<FormField
											control={form.control}
											name={`corePillars.${index}.title`}
											render={({ field }) => (
												<Input
													{...field}
													placeholder='Title of Pillar'
													className='h-8 p-0 bg-transparent border-none text-lg font-black focus-visible:ring-0'
												/>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name={`corePillars.${index}.description`}
										render={({ field }) => (
											<Textarea
												{...field}
												placeholder='What does this value represent in your work?'
												className='min-h-[80px] p-0 bg-transparent border-none text-sm text-zinc-500 resize-none focus-visible:ring-0 leading-relaxed'
											/>
										)}
									/>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* STICKY CONTROL BAR */}
				<div className='sticky bottom-8 flex justify-end pointer-events-none z-50'>
					<Button
						disabled={isPending}
						type='submit'
						className='pointer-events-auto h-14 px-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all gap-3 border-none'>
						{isPending ? (
							<Loader2 className='animate-spin h-5 w-5' />
						) : (
							<Zap size={18} fill='currentColor' />
						)}
						{isPending ? "SYNCING..." : "SAVE PHILOSOPHY"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
