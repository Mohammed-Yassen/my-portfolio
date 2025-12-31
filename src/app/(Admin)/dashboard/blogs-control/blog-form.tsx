/** @format */
"use client";

import React, { useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import {
	Loader2,
	Save,
	X,
	FileText,
	Settings2,
	Image as ImageIcon,
	Trash2,
	Plus,
	Hash,
} from "lucide-react";

import { blogSchema, type BlogFormValues } from "@/lib/validations";
import { createBlogAction, updateBlogAction } from "@/actions/blogs-actions";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Form, FormLabel } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormFieldWrapper } from "../../../../components/input-form-wrapper";
import { UploadButton } from "@/utils/uploadthing";
import { RichTextEditor } from "@/components/tiptap/rich-text-editor";

interface BlogFormProps {
	initialData?: any;
	onSuccess: () => void;
}

export function BlogForm({ initialData, onSuccess }: BlogFormProps) {
	const [isPending, startTransition] = useTransition();
	const isEditing = !!initialData?.id;

	const form = useForm<BlogFormValues>({
		resolver: zodResolver(blogSchema) as any,
		defaultValues: initialData
			? {
					...initialData,
					tags: initialData.tags?.map((t: any) => ({ name: t.name })) || [],
			  }
			: {
					title: "",
					slug: "",
					category: "General",
					excerpt: "",
					content: "",
					image: "",
					gallery: [],
					isPublished: false,
					tags: [],
			  },
	});

	const generateSlug = (title: string) => {
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
		form.setValue("slug", slug, { shouldValidate: true });
	};

	const onSubmit = (values: BlogFormValues) => {
		startTransition(async () => {
			const res = isEditing
				? await updateBlogAction(initialData.id, values)
				: await createBlogAction(values);

			if (res.success) {
				toast.success(isEditing ? "Blog updated" : "Blog published");
				onSuccess();
			} else {
				toast.error(res.message);
			}
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col min-h-[80vh]'>
				<Tabs defaultValue='general' className='flex-1'>
					<div className='px-4 pt-4'>
						<TabsList className='grid w-full grid-cols-3 max-w-125'>
							<TabsTrigger value='general' className='gap-2'>
								<Settings2 size={16} /> General
							</TabsTrigger>
							<TabsTrigger value='content' className='gap-2'>
								<FileText size={16} /> Content
							</TabsTrigger>
							<TabsTrigger value='media' className='gap-2'>
								<ImageIcon size={16} /> Media
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value='general' className='space-y-6 p-4 outline-none'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormFieldWrapper
								control={form.control}
								name='title'
								label='Post Title'>
								{(field) => (
									<Input
										{...field}
										placeholder='Title...'
										onChange={(e) => {
											field.onChange(e);
											if (!isEditing) generateSlug(e.target.value);
										}}
									/>
								)}
							</FormFieldWrapper>
							<FormFieldWrapper
								control={form.control}
								name='slug'
								label='URL Slug'>
								{(field) => <Input {...field} placeholder='url-slug-here' />}
							</FormFieldWrapper>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<FormFieldWrapper
								control={form.control}
								name='category'
								label='Category'>
								{(field) => <Input {...field} placeholder='e.g. Technology' />}
							</FormFieldWrapper>

							<FormFieldWrapper
								control={form.control}
								name='tags'
								label='Tags (Press Enter)'>
								{(field) => (
									<div className='space-y-3'>
										<Input
											placeholder='Add tag...'
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													const val = e.currentTarget.value.trim();
													if (
														val &&
														!field.value.some((t: any) => t.name === val)
													) {
														field.onChange([...field.value, { name: val }]);
														e.currentTarget.value = "";
													}
												}
											}}
										/>
										<div className='flex flex-wrap gap-2'>
											{field.value.map((tag: any, i: number) => (
												<Badge
													key={i}
													variant='secondary'
													className='gap-1 px-2 py-1'>
													{tag.name}
													<X
														size={12}
														className='cursor-pointer hover:text-destructive'
														onClick={() =>
															field.onChange(
																field.value.filter(
																	(_: any, idx: number) => idx !== i,
																),
															)
														}
													/>
												</Badge>
											))}
										</div>
									</div>
								)}
							</FormFieldWrapper>
						</div>

						<FormFieldWrapper
							control={form.control}
							name='excerpt'
							label='Excerpt'>
							{(field) => (
								<Textarea
									{...field}
									rows={3}
									placeholder='Brief summary...'
									className='resize-none'
								/>
							)}
						</FormFieldWrapper>
					</TabsContent>

					<TabsContent value='content' className='p-4 outline-none'>
						<FormFieldWrapper
							control={form.control}
							name='content'
							label='Article Body'>
							{(field) => (
								<RichTextEditor value={field.value} onChange={field.onChange} />
							)}
						</FormFieldWrapper>
					</TabsContent>

					<TabsContent
						value='media'
						className='p-8 outline-none focus-visible:ring-0'>
						<ImageUploaders form={form} />
					</TabsContent>
				</Tabs>

				{/* Footer */}
				<div className='sticky bottom-0 z-30 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-t mt-auto'>
					<FormFieldWrapper control={form.control} name='isPublished'>
						{(field) => (
							<div className='flex items-center gap-3'>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
								<div className='flex flex-col'>
									<span
										className={`text-sm font-bold ${
											field.value ? "text-green-600" : "text-muted-foreground"
										}`}>
										{field.value ? "Public" : "Private Draft"}
									</span>
									<span className='text-[10px] text-muted-foreground uppercase font-medium'>
										Visibility
									</span>
								</div>
							</div>
						)}
					</FormFieldWrapper>

					<div className='flex items-center gap-3'>
						<Button type='button' variant='ghost' onClick={onSuccess}>
							Cancel
						</Button>
						<Button
							type='submit'
							disabled={isPending}
							className='min-w-40 font-bold '>
							{isPending ? (
								<Loader2 className='w-4 h-4 animate-spin mr-2' />
							) : (
								<Save className='w-4 h-4 mr-2' />
							)}
							{isEditing ? "Update Post" : "Publish Now"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}

function ImageUploaders({ form }: { form: UseFormReturn<BlogFormValues> }) {
	const image = form.watch("image");
	const gallery = form.watch("gallery") || [];

	return (
		<div className='space-y-8'>
			<div className='space-y-2'>
				<FormLabel className='text-xs font-bold uppercase text-zinc-500'>
					Cover Image
				</FormLabel>
				<div className='p-8 border-2 border-dashed rounded-3xl flex flex-col items-center gap-4 bg-muted/30'>
					<UploadButton
						endpoint='primaryImage'
						onClientUploadComplete={(res) =>
							form.setValue("image", res?.[0]?.url || "")
						}
					/>
					{image && (
						<div className='relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border shadow-lg group'>
							<img
								src={image}
								className='w-full h-full object-cover'
								alt='Cover'
							/>
							<Button
								size='icon'
								variant='destructive'
								className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
								onClick={() => form.setValue("image", "")}>
								<Trash2 size={16} />
							</Button>
						</div>
					)}
				</div>
			</div>

			<div className='space-y-2'>
				<FormLabel className='text-xs font-bold uppercase text-zinc-500'>
					Gallery
				</FormLabel>
				<div className='p-6 border-2 border-dashed rounded-3xl bg-muted/30'>
					<UploadButton
						endpoint='secondaryImages'
						onClientUploadComplete={(res) =>
							form.setValue("gallery", [
								...gallery,
								...(res?.map((r) => r.url) || []),
							])
						}
					/>
					<div className='grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6'>
						{gallery.map((url: string, idx: number) => (
							<div
								key={idx}
								className='relative aspect-square rounded-xl overflow-hidden border group'>
								<img
									src={url}
									className='w-full h-full object-cover'
									alt='Gallery'
								/>
								<button
									type='button'
									className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
									onClick={() =>
										form.setValue(
											"gallery",
											gallery.filter((_, i) => i !== idx),
										)
									}>
									<X size={12} />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
