/** @format */

"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Save,
	Loader2,
	Sparkles,
	Image as ImageIcon,
	FileText,
	Trash2,
} from "lucide-react";

import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@prisma/client";
import { HeroFormValues, heroSchema } from "@/lib/validations";
import { updateHeroAction } from "@/app/actions";
import { FormFieldWrapper } from "@/components/input-form-wrapper";
import { UploadButton } from "@/utils/uploadthing";
import { cn } from "@/lib/utils";

export const HeroSectionFields = ({
	initialData,
}: {
	initialData: HeroSection | null;
}) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<HeroFormValues>({
		resolver: zodResolver(heroSchema) as any,
		defaultValues: {
			status: initialData?.status || "AVAILABLE",
			greeting: initialData?.greeting || "",
			name: initialData?.name || "",
			role: initialData?.role || "",
			description: initialData?.description || "",
			primaryImage: initialData?.primaryImage || "",
			secondaryImages: initialData?.secondaryImages || [],
			resumeUrl: initialData?.resumeUrl || "",
			ctaText: initialData?.ctaText || "Start a Project",
		},
	});
	const onSubmit = async (values: HeroFormValues) => {
		// startTransition is required for the isPending state to turn true

		startTransition(async () => {
			try {
				const result = await updateHeroAction(values);

				if (result.success) {
					toast.success("Hero essence synchronized.");
				} else {
					toast.error("Failed to update identity.");
				}
			} catch (error) {
				console.error("Submission Error:", error);

				toast.error("A server error occurred.");
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<div className='flex items-center justify-between bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800'>
					<div className='flex items-center gap-3'>
						<Sparkles className='text-blue-500' />
						<h2 className='text-xl font-bold'>Identity Essentials</h2>
					</div>
					<Button
						disabled={isPending}
						type='submit'
						className='rounded-xl shadow-lg'>
						{isPending ? (
							<Loader2 className='mr-2 animate-spin' size={18} />
						) : (
							<Save className='mr-2' size={18} />
						)}
						Save Changes
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{/* <div className='grid grid-cols-1 md:grid-cols-2 gap-6'></div> */}
					<FormFieldWrapper
						control={form.control}
						name='status'
						label='Availability'>
						{(field) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className='rounded-xl h-12'>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='AVAILABLE'>🟢 Available</SelectItem>
									<SelectItem value='BUSY'>🟠 Busy</SelectItem>
									<SelectItem value='OPEN_FOR_COMMISSION'>
										🔵 Commission
									</SelectItem>
								</SelectContent>
							</Select>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='greeting'
						label='Greeting'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-xl'
								placeholder='Hi, I am'
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='name'
						label='Display Name'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-xl'
								placeholder='Your Name'
							/>
						)}
					</FormFieldWrapper>
				</div>
				<FormFieldWrapper control={form.control} name='role' label='role'>
					{(field) => (
						<Input
							{...field}
							className='h-12 rounded-xl'
							placeholder='Full-Stack Developer && AI Engennering && Acadimic Researcher '
						/>
					)}
				</FormFieldWrapper>

				<FormFieldWrapper
					control={form.control}
					name='description'
					label='The Narrative'>
					{(field) => (
						<Textarea
							{...field}
							className='rounded-xl min-h-30'
							placeholder='Tell your story...'
						/>
					)}
				</FormFieldWrapper>
				{/* Section 2: Visuals */}
				<section className='space-y-6'>
					<div className='flex items-center gap-3 border-b pb-4'>
						<div className='h-6 w-1 bg-emerald-600 rounded-full' />
						<h2 className='text-xl font-bold'>Visual Assets</h2>
					</div>

					{/* Component to handle UploadThing logic */}
					<AssetUploaders form={form} />
				</section>
			</form>
		</Form>
	);
};

import { Upload, X, CheckCircle2 } from "lucide-react";

export function AssetUploaders({ form }: { form: any }) {
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [isUploadingResume, setIsUploadingResume] = useState(false);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-1'>
			{/* --- AVATAR FIELD --- */}
			<FormFieldWrapper
				control={form.control}
				name='primaryImage'
				label='Profile Avatar'>
				{(field) => (
					<div
						className={cn(
							"relative flex flex-col items-center justify-center min-h-[200px] gap-4 p-8 border-2 border-dashed rounded-[2rem] transition-all duration-300",
							isUploadingImage
								? "border-blue-500 bg-blue-50/30 animate-pulse"
								: "border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 hover:border-zinc-400 dark:hover:border-zinc-600",
						)}>
						{!field.value && !isUploadingImage && (
							<div className='flex flex-col items-center gap-2 text-zinc-400'>
								<div className='p-4 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700'>
									<Upload size={20} />
								</div>
								<p className='text-xs font-medium'>PNG or JPG up to 5MB</p>
							</div>
						)}

						<UploadButton
							endpoint='primaryImage'
							onUploadProgress={() => setIsUploadingImage(true)}
							onClientUploadComplete={(res) => {
								field.onChange(res?.[0]?.url);
								setIsUploadingImage(false);
								toast.success("Avatar uploaded");
							}}
							appearance={{
								button: cn(
									"px-6 py-2 rounded-full text-xs font-bold transition-transform active:scale-95",
									field.value
										? "opacity-0 absolute"
										: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black",
								),
								allowedContent: "hidden",
							}}
							content={{
								button: isUploadingImage ? "Uploading..." : "Select Image",
							}}
						/>

						{field.value && !isUploadingImage && (
							<div className='relative group/img'>
								<div className='absolute inset-0 bg-black/20 rounded-3xl opacity-0 group-hover/img:opacity-100 transition-opacity z-10' />
								<img
									src={field.value}
									alt='Avatar'
									className='w-32 h-32 object-cover rounded-3xl shadow-2xl ring-4 ring-white dark:ring-zinc-800'
								/>
								<button
									type='button'
									onClick={() => field.onChange("")}
									className='absolute -top-3 -right-3 z-20 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors'>
									<X size={14} />
								</button>
							</div>
						)}
					</div>
				)}
			</FormFieldWrapper>

			{/* --- RESUME FIELD --- */}
			<FormFieldWrapper
				control={form.control}
				name='resumeUrl'
				label='Documentation'>
				{(field) => (
					<div
						className={cn(
							"flex flex-col gap-6 p-8 border-2 border-dashed rounded-4xl transition-all duration-300 h-full justify-between",
							isUploadingResume
								? "border-emerald-500 bg-emerald-50/30"
								: "border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 hover:border-zinc-400",
						)}>
						<div className='space-y-2'>
							<h4 className='text-sm font-bold text-zinc-900 dark:text-zinc-100'>
								Resume / CV
							</h4>
							{/* <p className='text-xs text-zinc-500 leading-relaxed'>
								Please upload your latest professional resume in PDF format.
							</p> */}
						</div>

						<div className='space-y-4'>
							{field.value ? (
								<div className='flex items-center gap-4 p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm'>
									<div className='p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl'>
										<FileText size={20} />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate'>
											RESUME_FINAL.PDF
										</p>
										<div className='flex items-center gap-1 text-emerald-600'>
											<CheckCircle2 size={10} />
											<span className='text-[10px] font-semibold uppercase tracking-wider'>
												Verified
											</span>
										</div>
									</div>
									<button
										type='button'
										onClick={() => field.onChange("")}
										className='p-2 text-zinc-400 hover:text-red-500 transition-colors'>
										<X size={16} />
									</button>
								</div>
							) : (
								<UploadButton
									endpoint='resumeUploader'
									onUploadProgress={() => setIsUploadingResume(true)}
									onClientUploadComplete={(res) => {
										field.onChange(res?.[0]?.url);
										setIsUploadingResume(false);
									}}
									appearance={{
										button:
											"w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]",
										allowedContent:
											"text-[10px] uppercase font-bold text-zinc-400 mt-2",
									}}
									content={{
										button: isUploadingResume ? "Processing..." : "Upload PDF",
									}}
								/>
							)}
						</div>
					</div>
				)}
			</FormFieldWrapper>
		</div>
	);
}
// Simple UI wrapper for visual consistency
export function FieldShell({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className='space-y-2'>
			<label className='text-xs font-black uppercase tracking-widest text-zinc-500'>
				{label}
			</label>
			<div className='p-1'>{children}</div>
		</div>
	);
}
