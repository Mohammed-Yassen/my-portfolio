/** @format */

"use client";
import {
	Pencil,
	Trash2,
	Plus,
	Loader2,
	X,
	LayoutGrid,
	Sparkles,
	Circle,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Icons from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Import your specific schemas and actions
import {
	skillCategorySchema,
	type SkillCategoryFormValues,
} from "@/lib/validations";
import {
	deleteSkillCategoryAction,
	upsertSkillCategoryAction,
	// deleteSkillCategoryAction,
} from "@/app/actions";
import { IconPicker } from "../icon-picker";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface Props {
	initialData: any[]; // Ideally SkillCategoryWithSkills[]
}

export function SkillCategoryForm({ initialData }: Props) {
	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);

	const form = useForm<SkillCategoryFormValues>({
		resolver: zodResolver(skillCategorySchema) as any,
		defaultValues: {
			title: "",
			icon: "Layers",
			order: 0,
			isActive: true,
			skills: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "skills",
	});

	const onEdit = (category: any) => {
		setEditingId(category.id);
		form.reset({
			title: category.title,
			icon: category.icon,
			order: category.order || 0,
			isActive: category.isActive,
			skills: category.skills.map((s: any) => ({
				name: s.name,
				level: s.level,
				icon: s.icon || null,
			})),
		});
		setIsEditing(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const onCancel = () => {
		setIsEditing(false);
		setEditingId(null);
		form.reset({
			title: "",
			icon: "Layers",
			order: 0,
			isActive: true,
			skills: [],
		});
	};

	const onSubmit = async (values: SkillCategoryFormValues) => {
		startTransition(async () => {
			const result = await upsertSkillCategoryAction(
				values,
				editingId || undefined,
			);
			if (result.success) {
				toast.success(isEditing ? "Category updated" : "Category created");
				onCancel();
			} else {
				toast.error(result.message || "Something went wrong");
			}
		});
	};

	const onDelete = async (id: string) => {
		if (!confirm("Delete this category and all its skills?")) return;
		startTransition(async () => {
			const result = await deleteSkillCategoryAction(id);
			if (result.success) toast.success("Category deleted");
			else toast.error("Delete failed");
		});
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
			{/* --- LEFT SIDE: THE FORM CARD --- */}
			<div className='lg:col-span-5 space-y-4'>
				<Card
					className={`border-2 transition-all ${
						isEditing
							? "border-primary shadow-md"
							: "border-dashed bg-zinc-50/50"
					}`}>
					<CardHeader>
						<CardTitle className='flex items-center gap-2'>
							{isEditing ? (
								<Sparkles className='w-5 h-5 text-primary' />
							) : (
								<Plus className='w-5 h-5' />
							)}
							{isEditing ? "Edit Category" : "Add New Category"}
						</CardTitle>
						<CardDescription>
							{isEditing
								? "Updating existing technical skills"
								: "Create a group for your technical skills"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-6'>
								<div className='grid grid-cols-1 gap-4'>
									<FormField
										control={form.control}
										name='title'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Category Name</FormLabel>
												<FormControl>
													<Input placeholder='e.g. Frontend Tools' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='icon'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Icon</FormLabel>
												<FormControl>
													<IconPicker
														value={field.value}
														onChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<Separator className='my-4' />

								<div className='space-y-3'>
									<div className='flex items-center justify-between'>
										<FormLabel className='text-sm font-semibold'>
											Skills List
										</FormLabel>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() =>
												append({ name: "", level: 80, icon: null })
											}>
											<Plus className='w-3 h-3 mr-1' /> Add Skill
										</Button>
									</div>

									<div className='space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
										{fields.map((field, index) => (
											<div
												key={field.id}
												className='p-3 border rounded-md bg-white dark:bg-zinc-950 relative space-y-3 shadow-sm'>
												<Button
													variant='ghost'
													size='icon'
													className='absolute top-1 right-1 h-7 w-7'
													onClick={() => remove(index)}>
													<X className='w-3 h-3' />
												</Button>

												<div className='grid grid-cols-1 gap-2'>
													<FormField
														control={form.control}
														name={`skills.${index}.name`}
														render={({ field }) => (
															<FormControl>
																<Input
																	className='h-8'
																	placeholder='Skill (e.g. React)'
																	{...field}
																/>
															</FormControl>
														)}
													/>
													<FormField
														control={form.control}
														name={`skills.${index}.level`}
														render={({ field }) => (
															<div className='px-1'>
																<div className='flex justify-between text-[10px] uppercase font-bold text-zinc-500 mb-1'>
																	<span>Proficiency</span>
																	<span>{field.value}%</span>
																</div>
																<Slider
																	value={[field.value || 0]}
																	onValueChange={(v) => field.onChange(v[0])}
																	max={100}
																	step={5}
																/>
															</div>
														)}
													/>
												</div>
											</div>
										))}
										{fields.length === 0 && (
											<p className='text-xs text-center text-muted-foreground py-4'>
												No skills added yet.
											</p>
										)}
									</div>
									{form.formState.errors.skills && (
										<p className='text-destructive text-xs'>
											{form.formState.errors.skills.message}
										</p>
									)}
								</div>

								<div className='flex gap-2 pt-2'>
									<Button disabled={isPending} type='submit' className='flex-1'>
										{isPending ? (
											<Loader2 className='w-4 h-4 animate-spin' />
										) : isEditing ? (
											"Update Category"
										) : (
											"Save Category"
										)}
									</Button>
									{isEditing && (
										<Button type='button' variant='ghost' onClick={onCancel}>
											Cancel
										</Button>
									)}
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>

			{/* --- RIGHT SIDE: DATA LIST --- */}
			<div className='lg:col-span-7 space-y-4'>
				<div className='grid grid-cols-1 gap-3'>
					{initialData.length === 0 && (
						<div className='text-center p-12 border-2 border-dashed rounded-xl text-muted-foreground'>
							No skills found. Start by adding a category.
						</div>
					)}
					{initialData.map((cat) => {
						const CatIcon = (Icons as any)[cat.icon] || LayoutGrid;
						return (
							<Card
								key={cat.id}
								className={`group transition-all hover:border-primary/50 ${
									editingId === cat.id ? "ring-2 ring-primary" : ""
								}`}>
								<div className='p-4 flex items-center justify-between'>
									<div className='flex items-center gap-4'>
										<div className='p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-primary/10 transition-colors'>
											<CatIcon className='w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-primary' />
										</div>
										<div>
											<h4 className='font-bold text-sm'>{cat.title}</h4>
											<div className='flex flex-wrap gap-1 mt-1'>
												{cat.skills.map((s: any, idx: number) => (
													<Badge
														key={idx}
														variant='secondary'
														className='text-[10px] px-1.5 py-0 h-4'>
														{s.name} • {s.level}%
													</Badge>
												))}
											</div>
										</div>
									</div>
									<div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
										<Button
											variant='outline'
											size='icon'
											className='h-8 w-8'
											onClick={() => onEdit(cat)}>
											<Pencil className='h-3.5 w-3.5' />
										</Button>
										<Button
											variant='outline'
											size='icon'
											className='h-8 w-8 text-destructive hover:bg-destructive/10'
											onClick={() => onDelete(cat.id)}>
											<Trash2 className='h-3.5 w-3.5' />
										</Button>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
