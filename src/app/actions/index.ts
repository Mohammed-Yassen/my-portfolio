/** @format */
"use server";

import { db } from "@/lib/db";
import {
	AboutFormSchema,
	aboutSchema,
	HeroFormValues,
	heroSchema,
} from "@/lib/validations"; // Use the specific hero schema
import { revalidatePath } from "next/cache";

export const updateHeroAction = async (values: any) => {
	// 1. Validate the input against the schema
	const validated = heroSchema.safeParse(values);

	if (!validated.success) {
		return {
			success: false,
			error: validated.error.flatten().fieldErrors,
		};
	}

	try {
		const data = validated.data;

		// 2. Perform the Upsert
		// We use a static ID like "hero-static" to ensure we only ever have ONE hero record
		await db.heroSection.upsert({
			where: { id: "hero-static" },
			update: {
				status: data.status,
				greeting: data.greeting,
				name: data.name,
				role: data.role,
				description: data.description,
				primaryImage: data.primaryImage,
				secondaryImages: data.secondaryImages,
				resumeUrl: data.resumeUrl,
				ctaText: data.ctaText,
			},
			create: {
				id: "hero-static", // Set the explicit ID for the first time
				status: data.status,
				greeting: data.greeting,
				name: data.name,
				role: data.role,
				description: data.description,
				primaryImage: data.primaryImage,
				secondaryImages: data.secondaryImages,
				resumeUrl: data.resumeUrl,
				ctaText: data.ctaText,
			},
		});

		// 3. Clear the cache for the frontend and admin pages
		revalidatePath("/");
		revalidatePath("/admin/identity");

		return { success: true, mesage: "Identity synchronized successfully!" };
	} catch (error) {
		console.error("[HERO_UPDATE_ERROR]:", error);
		return {
			success: false,
			error: "A database error occurred while saving your identity.",
		};
	}
};

export const UpdateAboutSection = async (values: AboutFormSchema) => {
	// 1. Validate against the About Schema (not heroSchema!)
	const validated = aboutSchema.safeParse(values);

	if (!validated.success) {
		return {
			success: false,
			error: validated.error.flatten().fieldErrors,
		};
	}

	try {
		const { corePillars, statuses, ...aboutData } = validated.data;

		// 2. Perform the Transaction
		// We use $transaction to ensure both the about info and pillars save together
		await db.$transaction(async (tx) => {
			await tx.aboutSection.upsert({
				where: { id: "about-static" },
				update: {
					...aboutData,
					// Handle relations: Wipe old ones and create new ones
					corePillars: {
						deleteMany: {}, // Remove existing pillars
						createMany: {
							data: corePillars.map((p: any) => ({
								icon: p.icon,
								title: p.title,
								description: p.description,
							})),
						},
					},
					statuses: {
						deleteMany: {}, // Remove existing statuses
						createMany: {
							data: statuses.map((s: any) => ({
								label: s.label,
								value: s.value,
								isActive: s.isActive,
							})),
						},
					},
				},
				create: {
					id: "about-static",
					...aboutData,
					corePillars: {
						createMany: {
							data: corePillars.map((p: any) => ({
								icon: p.icon,
								title: p.title,
								description: p.description,
							})),
						},
					},
					statuses: {
						createMany: {
							data: statuses.map((s: any) => ({
								label: s.label,
								value: s.value,
								isActive: s.isActive,
							})),
						},
					},
				},
			});
		});

		// 3. Revalidate
		revalidatePath("/");
		revalidatePath("/admin/identety-controls");

		return { success: true };
	} catch (error) {
		console.error("[ABOUT_UPDATE_ERROR]:", error);
		return {
			success: false,
			error: "Failed to sync your philosophy to the database.",
		};
	}
};
