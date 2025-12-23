/** @format */

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { HeroSectionFields } from "./hero-form";
// import { AboutSectionFields } from "./about-form";
import { PreviewMobile } from "./preview-mobile";

import { identitySchema, type IdentityFormValues } from "@/lib/validations";
import { updateIdentity } from "@/app/actions/identety";
import { AboutSectionFields } from "./about-form";

interface IdentityFormManagerProps {
	initialData: {
		hero: any;
		about: any;
	};
}

export function IdentityFormManager({ initialData }: IdentityFormManagerProps) {
	const form = useForm<IdentityFormValues>({
		resolver: zodResolver(identitySchema) as any,
		defaultValues: {
			hero: {
				status: initialData.hero?.status || "AVAILABLE",
				greeting: initialData.hero?.greeting || "Hi, I am",
				name: initialData.hero?.name || "",
				role: initialData.hero?.role || "",
				description: initialData.hero?.description || "",
				primaryImage: initialData.hero?.primaryImage || "",
				secondaryImages: initialData.hero?.secondaryImages || [],
				ctaText: initialData.hero?.ctaText || "Start a Project",
				githubUrl: initialData.hero?.githubUrl || "",
				linkedinUrl: initialData.hero?.linkedinUrl || "",
				resumeUrl: initialData.hero?.resumeUrl || "",
			},
			about: {
				title: initialData.about?.title || "",
				subtitle: initialData.about?.subtitle || "",
				description: initialData.about?.description || "",
				yearsExp: initialData.about?.yearsExp || 0,
				projectsCount: initialData.about?.projectsCount || 0,
				corePillars: initialData.about?.corePillars || [],
			},
		},
	});

	const watchedValues = form.watch();
	const { isSubmitting } = form.formState;

	const onSubmit = async (data: IdentityFormValues) => {
		try {
			const result = await updateIdentity(data);
			if (result.success) {
				toast.success("Identity updated successfully!");
			} else {
				toast.error(result.error || "Update failed");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
				<div className='lg:col-span-7 space-y-6'>
					<div className='flex justify-between items-center bg-white dark:bg-zinc-900 p-5 rounded-2xl border shadow-sm'>
						<div>
							<h2 className='text-lg font-bold'>Personal Identity</h2>
							<p className='text-xs text-zinc-500'>
								Configure your professional brand.
							</p>
						</div>
						<Button
							disabled={isSubmitting}
							size='sm'
							className='rounded-xl px-6'>
							{isSubmitting ? (
								<Loader2 className='animate-spin mr-2' size={16} />
							) : (
								<Save className='mr-2' size={16} />
							)}
							Save Changes
						</Button>
					</div>

					<Tabs defaultValue='hero' className='w-full'>
						<TabsList className='grid w-full grid-cols-2 h-14 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl'>
							<TabsTrigger value='hero' className='rounded-xl font-bold'>
								1. Hero Essence
							</TabsTrigger>
							<TabsTrigger value='about' className='rounded-xl font-bold'>
								2. About Philosophy
							</TabsTrigger>
						</TabsList>

						<TabsContent value='hero' className='mt-6'>
							{/* Pass the entire form object */}
							<HeroSectionFields form={form} />
						</TabsContent>

						<TabsContent value='about' className='mt-6'>
							{/* <AboutSectionFields form={form} /> */}
							<div className='p-8 text-center border-2 border-dashed rounded-3xl text-zinc-400'>
								<AboutSectionFields form={form} />
							</div>
						</TabsContent>
					</Tabs>
				</div>

				<div className='lg:col-span-5'>
					<div className='sticky top-10'>
						<PreviewMobile
							hero={watchedValues.hero}
							about={watchedValues.about}
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
