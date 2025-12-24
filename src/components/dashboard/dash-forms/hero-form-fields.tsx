/** @format */
"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, Loader2, Trash2, FileText } from "lucide-react";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
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
import { UploadButton } from "@/utils/uploadthing";
import { cn } from "@/lib/utils";

interface HeroSectionFieldsProps {
	initialData: HeroSection | null;
}

export const HeroSectionFields = ({ initialData }: HeroSectionFieldsProps) => {
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
			<form
				// The second argument (errors) helps you debug why the form won't submit
				onSubmit={form.handleSubmit(onSubmit, (errors) => {
					console.error("Validation Errors:", errors);
					toast.error("Please fill all required fields correctly.");
				})}
				className='space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500'>
				{/* Section 1: Essentials */}
				<section className='space-y-6'>
					<div className='flex items-center justify-between border-b pb-4'>
						<div className='flex items-center gap-3'>
							<div className='h-6 w-1 bg-blue-600 rounded-full' />
							<h2 className='text-xl font-bold'>Identity Essentials</h2>
						</div>

						<Button
							type='submit'
							disabled={isPending}
							className='rounded-2xl h-12 px-6 bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900'>
							{isPending ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : (
								<Save className='mr-2 h-4 w-4' />
							)}
							{isPending ? "Saving..." : "Save Identity"}
						</Button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] uppercase font-bold tracking-widest text-zinc-500'>
										Availability
									</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className='h-12 rounded-xl border-zinc-200 dark:border-zinc-800'>
												<SelectValue placeholder='Status' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='AVAILABLE'>🟢 Available</SelectItem>
											<SelectItem value='BUSY'>🟠 Busy</SelectItem>
											<SelectItem value='OPEN_FOR_COMMISSION'>
												🔵 Commission
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<FormField
							control={form.control}
							name='greeting'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] uppercase font-bold tracking-widest text-zinc-500'>
										Greating Label
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Hi, I am '
											className='h-12 rounded-xl border-zinc-200 dark:border-zinc-800'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] uppercase font-bold tracking-widest text-zinc-500'>
										Display Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Mohammed Jmal'
											className='h-12 rounded-xl border-zinc-200 dark:border-zinc-800'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1  '>
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-[10px] uppercase font-bold tracking-widest text-zinc-500'>
										Your Role
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Full-Stack Developer & AI Researcher'
											className='h-12 rounded-xl border-zinc-200 dark:border-zinc-800'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-[10px] uppercase font-bold tracking-widest text-zinc-500'>
									The Narrative
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										rows={4}
										className='rounded-xl resize-none border-zinc-200 dark:border-zinc-800'
										placeholder='Tell your story...'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>

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
export function AssetUploaders({ form }: { form: any }) {
	const [isUploadingImage, setIsUploadingImage] = useState(false);
	const [isUploadingResume, setIsUploadingResume] = useState(false);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			<FormField
				control={form.control}
				name='primaryImage'
				render={({ field }) => (
					<FormItem className='relative group'>
						<FormLabel className='text-xs font-black uppercase tracking-widest text-zinc-500'>
							Profile Avatar
						</FormLabel>
						<div
							className={cn(
								"flex flex-col gap-4 p-6 border-2 border-dashed rounded-3xl transition-all",
								isUploadingImage
									? "bg-blue-50/50 border-blue-400"
									: "bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200",
							)}>
							<UploadButton
								endpoint='primaryImage'
								onUploadProgress={() => setIsUploadingImage(true)}
								onClientUploadComplete={(res) => {
									field.onChange(res?.[0]?.url);
									setIsUploadingImage(false);
									toast.success("Avatar uploaded");
								}}
								onUploadError={(error: Error) => {
									setIsUploadingImage(false);
									toast.error(error.message);
								}}
								appearance={{
									button: cn(
										"w-full h-10 rounded-xl text-sm font-bold",
										isUploadingImage
											? "bg-zinc-400"
											: "bg-zinc-900 dark:bg-zinc-100 dark:text-black",
									),
								}}
								content={{
									button: isUploadingImage ? "Uploading..." : "Choose Image",
								}}
							/>
							{field.value && !isUploadingImage && (
								<div className='relative w-24 h-24 self-center'>
									<img
										src={field.value}
										alt='Avatar'
										className='w-full h-full object-cover rounded-2xl'
									/>
									<Button
										type='button'
										variant='destructive'
										size='icon'
										className='absolute -top-2 -right-2 h-7 w-7 rounded-full'
										onClick={() => field.onChange("")}>
										<Trash2 size={14} />
									</Button>
								</div>
							)}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='resumeUrl'
				render={({ field }) => (
					<FormItem className='relative group'>
						<FormLabel className='text-xs font-black uppercase tracking-widest text-zinc-500'>
							Resume (PDF)
						</FormLabel>
						<div
							className={cn(
								"flex flex-col gap-4 p-6 border-2 border-dashed rounded-3xl transition-all h-full",
								isUploadingResume
									? "bg-blue-50/50 border-blue-400"
									: "bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200",
							)}>
							<UploadButton
								endpoint='resumeUploader'
								onUploadProgress={() => setIsUploadingResume(true)}
								onClientUploadComplete={(res) => {
									field.onChange(res?.[0]?.url);
									setIsUploadingResume(false);
									toast.success("Resume attached");
								}}
								onUploadError={() => {
									setIsUploadingResume(false);
									toast.error("Upload failed");
								}}
								appearance={{
									button:
										"w-full bg-blue-600 h-10 rounded-xl text-sm font-bold",
								}}
								content={{
									button: isUploadingResume ? "Processing..." : "Upload Resume",
								}}
							/>
							<div
								className={cn(
									"flex items-center justify-between p-4 rounded-xl border-2",
									field.value
										? "bg-emerald-50/50 border-emerald-100 text-emerald-700"
										: "bg-zinc-100/50 text-zinc-400",
								)}>
								<div className='flex items-center gap-3'>
									<FileText size={18} />
									<span className='text-xs font-bold'>
										{field.value ? "RESUME_READY.PDF" : "NO FILE"}
									</span>
								</div>
								{field.value && (
									<button
										onClick={() => field.onChange("")}
										className='text-emerald-700 hover:text-red-500'>
										<Trash2 size={14} />
									</button>
								)}
							</div>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
