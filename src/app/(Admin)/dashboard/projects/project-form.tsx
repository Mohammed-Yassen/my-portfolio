/** @format */
"use client";

import React, { useEffect } from "react";
import {
	useForm,
	useFieldArray,
	Control,
	FieldPath,
	FieldValues,
	ControllerRenderProps,
	UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
	ImagePlus,
	Link,
	FileText,
	Settings,
	Trash2,
	X,
	Plus,
	Cpu,
	FolderOpen,
	Pencil,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProjectFormValues, projectSchema } from "@/lib/validations";
import { UploadButton } from "@/utils/uploadthing";
import { createProject, updateProject } from "@/actions/projects-action";
import { IconPicker } from "@/components/dashboard/icon-picker";
import { FormFieldWrapper } from "@/components/input-form-wrapper";

// --- Type-Safe Form Field Wrapper ---

interface ProjectFormProps {
	initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema) as any,
		defaultValues: {
			title: "",
			slug: "",
			description: "",
			content: "",
			image: "",
			gallery: [],
			category: "WEB_DEVELOPMENT",
			liveUrl: "",
			repoUrl: "",
			isFeatured: false,
			isPublished: false,
			isActive: true,
			techniques: [],
			tags: [], // Added default for tags
			...initialData,
		},
	});

	// Handle Reset on Data Change
	useEffect(() => {
		if (initialData) form.reset(initialData);
	}, [initialData, form]);

	// Field Array for Techniques
	const {
		fields: techFields,
		append: appendTech,
		remove: removeTech,
	} = useFieldArray({
		control: form.control,
		name: "techniques",
	});

	// Field Array for Tags
	const {
		fields: tagFields,
		append: appendTag,
		remove: removeTag,
	} = useFieldArray({
		control: form.control,
		name: "tags",
	});

	const onSubmit = async (values: ProjectFormValues) => {
		const isUpdate = !!initialData?.id;

		try {
			const result = isUpdate
				? await updateProject(initialData.id, values)
				: await createProject(values);

			if (result.error) {
				toast.error(result.error);
				return;
			}
			toast.success(result.success);
			if (!isUpdate) form.reset();
		} catch (error) {
			toast.error("An unexpected error occurred.");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, () => {
					toast.error("Please fill all required fields correctly.");
				})}
				className='space-y-6 bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm p-8 mt-4'>
				<Tabs defaultValue='general' className='w-full'>
					<TabsList className='grid w-full grid-cols-5 mb-8'>
						<TabTriggerItem
							value='general'
							icon={<Settings className='w-4 h-4' />}
							label='Basic'
						/>
						<TabTriggerItem
							value='techniques'
							icon={<Cpu className='w-4 h-4' />}
							label='Tech'
						/>
						<TabTriggerItem
							value='media'
							icon={<ImagePlus className='w-4 h-4' />}
							label='Media'
						/>
						<TabTriggerItem
							value='links'
							icon={<Link className='w-4 h-4' />}
							label='Links'
						/>
						<TabTriggerItem
							value='content'
							icon={<FileText className='w-4 h-4' />}
							label='Story'
						/>
					</TabsList>

					{/* BASIC INFO */}
					<TabsContent value='general' className='space-y-4'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<FormFieldWrapper
								control={form.control}
								name='title'
								label='Project Title'>
								{(field) => <Input placeholder='My Project' {...field} />}
							</FormFieldWrapper>
							<FormFieldWrapper
								control={form.control}
								name='slug'
								label='Slug (URL)'>
								{(field) => <Input placeholder='my-project-url' {...field} />}
							</FormFieldWrapper>
						</div>
						<FormFieldWrapper
							control={form.control}
							name='category'
							label='Project Category'>
							{(field) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<SelectTrigger>
										<SelectValue placeholder='Select category' />
									</SelectTrigger>
									<SelectContent>
										{[
											"WEB_DEVELOPMENT",
											"MOBILE_APP",
											"UI_UX_DESIGN",
											"GRAPHIC_DESIGN",
											"DATA_SCIENCE",
											"AI",
											"OPEN_SOURCE",
											"OTHERS",
										].map((cat) => (
											<SelectItem key={cat} value={cat}>
												{cat.replace("_", " ")}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						</FormFieldWrapper>
						<div className='grid grid-cols-2 gap-4'>
							<StatusToggle
								control={form.control}
								name='isFeatured'
								label='Featured'
							/>
							<StatusToggle
								control={form.control}
								name='isPublished'
								label='Published'
							/>
							<StatusToggle
								control={form.control}
								name='isActive'
								label='Active'
							/>
						</div>
					</TabsContent>

					{/* TECHNIQUES & TAGS */}
					<TabsContent value='techniques' className='space-y-8'>
						{/* TAGS SECTION (SIMPLE) */}
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-medium'>Add Tags</h3>
								<Button
									type='button'
									variant='outline'
									size='sm'
									onClick={() => appendTag({ name: "" })}>
									<Plus className='w-4 h-4 mr-2' /> Add Tag
								</Button>
							</div>
							<div className='flex flex-wrap gap-2'>
								{tagFields.map((field, index) => (
									<div
										key={field.id}
										className='flex items-center gap-1 p-1 pl-3 rounded-full border'>
										<FormField
											control={form.control}
											name={`tags.${index}.name`}
											render={({ field }) => (
												<Input
													{...field}
													placeholder='# Modern Portfolio'
													className='h-9'
												/>
											)}
										/>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											className='h-6 w-6 rounded-full'
											onClick={() => removeTag(index)}>
											<Trash2 className='w-3 h-3' />
										</Button>
									</div>
								))}
							</div>
						</div>

						<hr />

						{/* TECHNIQUES SECTION (NAME + ICON) */}
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-medium'>Techniques & Skills</h3>
								<Button
									type='button'
									variant='outline'
									size='sm'
									onClick={() => appendTech({ name: "", icon: "Code" })}>
									<Plus className='w-4 h-4 mr-2' /> Add Skill
								</Button>
							</div>
							<div className='grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2'>
								{techFields.map((field, index) => (
									<div
										key={field.id}
										className='flex items-center gap-4 p-3 border rounded-xl bg-zinc-50 dark:bg-zinc-950 group'>
										<div className='flex-1'>
											<FormField
												control={form.control}
												name={`techniques.${index}.name`}
												render={({ field }) => (
													<Input
														{...field}
														placeholder='React, Prisma...'
														className='h-9'
													/>
												)}
											/>
										</div>
										<div className='w-32'>
											<FormField
												control={form.control}
												name={`techniques.${index}.icon`}
												render={({ field }) => (
													<IconPicker
														value={field.value || "Code"}
														onChange={field.onChange}
													/>
												)}
											/>
										</div>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											className='text-destructive'
											onClick={() => removeTech(index)}>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								))}
							</div>
						</div>
					</TabsContent>

					<TabsContent value='media'>
						<ImageUploaders form={form} />
					</TabsContent>

					<TabsContent value='links' className='space-y-4'>
						<FormFieldWrapper
							control={form.control}
							name='liveUrl'
							label='Live Demo URL'>
							{(field) => <Input {...field} value={field.value ?? ""} />}
						</FormFieldWrapper>
						<FormFieldWrapper
							control={form.control}
							name='repoUrl'
							label='GitHub URL'>
							{(field) => <Input {...field} value={field.value ?? ""} />}
						</FormFieldWrapper>
					</TabsContent>

					<TabsContent value='content' className='space-y-4'>
						<FormFieldWrapper
							control={form.control}
							name='description'
							label='Short Summary'>
							{(field) => <Textarea rows={3} {...field} />}
						</FormFieldWrapper>
						<FormFieldWrapper
							control={form.control}
							name='content'
							label='Detailed Story (Markdown)'>
							{(field) => (
								<Textarea rows={8} {...field} value={field.value ?? ""} />
							)}
						</FormFieldWrapper>
					</TabsContent>
				</Tabs>

				<Button
					type='submit'
					className='w-full h-12 text-lg'
					disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting
						? "Saving..."
						: initialData?.id
						? "Update Project"
						: "Create Project"}
				</Button>
			</form>
		</Form>
	);
}
// --- Helper Sub-components ---

function TabTriggerItem({
	value,
	icon,
	label,
}: {
	value: string;
	icon: React.ReactNode;
	label: string;
}) {
	return (
		<TabsTrigger value={value} className='flex items-center gap-2'>
			{icon} <span className='hidden sm:inline'>{label}</span>
		</TabsTrigger>
	);
}

function StatusToggle<T extends FieldValues>({
	control,
	name,
	label,
}: {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
}) {
	return (
		<div className='flex items-center justify-between p-3 border rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50'>
			<span className='text-sm font-medium'>{label}</span>
			<FormField
				control={control}
				name={name}
				render={({ field }) => (
					<Switch checked={field.value} onCheckedChange={field.onChange} />
				)}
			/>
		</div>
	);
}

function ImageUploaders({ form }: { form: UseFormReturn<ProjectFormValues> }) {
	const image = form.watch("image");
	const gallery = form.watch("gallery") || [];

	return (
		<div className='space-y-8'>
			<div className='space-y-2'>
				<FormLabel className='text-xs font-bold uppercase text-zinc-500'>
					Cover Image
				</FormLabel>
				<div className='p-8 border-2 border-dashed rounded-3xl flex flex-col items-center gap-4 bg-zinc-50 dark:bg-zinc-900'>
					<UploadButton
						endpoint='primaryImage'
						onClientUploadComplete={(res) => {
							form.setValue("image", res?.[0]?.url || "");
							toast.success("Cover uploaded");
						}}
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
				<div className='p-6 border-2 border-dashed rounded-3xl bg-zinc-50 dark:bg-zinc-900'>
					<UploadButton
						endpoint='secondaryImages'
						onClientUploadComplete={(res) => {
							const urls = res?.map((r) => r.url) || [];
							form.setValue("gallery", [...gallery, ...urls]);
						}}
					/>
					<div className='grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6'>
						{gallery.map((url, idx) => (
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
									onClick={() =>
										form.setValue(
											"gallery",
											gallery.filter((_, i) => i !== idx),
										)
									}
									className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
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
