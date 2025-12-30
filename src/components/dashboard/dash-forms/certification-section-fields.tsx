/** @format */
"use client";

import React, { useTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	Award,
	Save,
	Loader2,
	Link as LinkIcon,
	Image as ImageIcon,
	Upload,
	X,
} from "lucide-react";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormFieldWrapper } from "@/components/input-form-wrapper";

import {
	CertificationSchema,
	CertificationFormValues,
} from "@/lib/validations";

import { Certification } from "@prisma/client";
import { createCertification, updateCertification } from "@/app/actions";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/utils/uploadthing";

interface CertificationFieldsProps {
	initialData?: Certification | null;
}

export const CertificationSectionFields = ({
	initialData,
}: CertificationFieldsProps) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<CertificationFormValues>({
		resolver: zodResolver(CertificationSchema),
		defaultValues: {
			title: "",
			issuer: "",
			issueDate: "",
			imageUrl: "",
			credentialId: "",
			link: "",
		},
	});

	useEffect(() => {
		if (initialData) {
			form.reset({
				title: initialData.title,
				issuer: initialData.issuer,
				issueDate: initialData.issueDate,
				imageUrl: initialData.imageUrl || "",
				credentialId: initialData.credentialId || "",
				link: initialData.link || "",
			});
		}
	}, [initialData, form]);

	const onSubmit = async (values: CertificationFormValues) => {
		startTransition(async () => {
			try {
				const result = initialData?.id
					? await updateCertification(initialData.id, values)
					: await createCertification(values);

				if (result.success) {
					toast.success(initialData?.id ? "Updated!" : "Created!");
					if (!initialData?.id) form.reset();
				} else {
					// This shows the specific error from Zod or Prisma
					toast.error(result.error || "An unexpected error occurred");
				}
			} catch (error) {
				// This handles network crashes or server timeouts
				toast.error("Critical connection error. Check server logs.");
			}
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				{/* Header Card */}
				<div className='flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800'>
					<div className='flex items-center gap-4'>
						<div className='p-3 bg-amber-500/10 text-amber-600 rounded-2xl'>
							<Award size={24} />
						</div>
						<div>
							<h2 className='text-xl font-bold tracking-tight'>
								{initialData?.id ? "Edit Certification" : "New Certification"}
							</h2>
							<p className='text-xs text-zinc-500 font-mono uppercase tracking-widest'>
								{form.watch("issuer") || "Credential Verification"}
							</p>
						</div>
					</div>
					<Button
						disabled={isPending}
						type='submit'
						className='rounded-2xl px-8 bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/10'>
						{isPending ? (
							<Loader2 className='animate-spin' size={18} />
						) : (
							<Save className='mr-2' size={18} />
						)}
						{initialData?.id ? "Update" : "Save"}
					</Button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='title'
						label='Certification Title'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl'
								placeholder='AWS Certified Developer'
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='issuer'
						label='Issuing Organization'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl'
								placeholder='Amazon Web Services'
							/>
						)}
					</FormFieldWrapper>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='issueDate'
						label='Issue Date (String)'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl'
								placeholder='Jan 2024'
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='credentialId'
						label='Credential ID (Optional)'>
						{(field) => (
							<Input
								{...field}
								className='h-12 rounded-2xl'
								placeholder='ABC-123-XYZ'
							/>
						)}
					</FormFieldWrapper>

					<div className=''>
						<ImgUploaders form={form} />
					</div>
				</div>

				<FormFieldWrapper
					control={form.control}
					name='link'
					label='Verification Link'>
					{(field) => (
						<div className='relative'>
							<Input
								{...field}
								className='h-12 rounded-2xl pl-10'
								placeholder='https://verify.com/cert/...'
							/>
							<LinkIcon
								className='absolute left-3 top-3.5 text-zinc-400'
								size={18}
							/>
						</div>
					)}
				</FormFieldWrapper>
			</form>
		</Form>
	);
};
export function ImgUploaders({ form }: { form: any }) {
	const [isUploadingImage, setIsUploadingImage] = useState(false);

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
							"relative flex flex-col items-center justify-center min-h-50 gap-4 p-8 border-2 border-dashed rounded-[2rem] transition-all duration-300",
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
		</div>
	);
}
