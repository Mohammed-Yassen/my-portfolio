/** @format */
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/db";
import {
	heroSchema,
	aboutSchema,
	type HeroFormValues,
	type AboutFormValues,
	SkillCategoryFormValues,
	skillCategorySchema,
} from "@/lib/validations";

export const updateHeroAction = async (values: HeroFormValues) => {
	const validated = heroSchema.safeParse(values);
	if (!validated.success)
		return { success: false, errors: validated.error.flatten().fieldErrors };

	try {
		await db.heroSection.upsert({
			where: { id: "hero-static" },
			update: validated.data,
			create: { id: "hero-static", ...validated.data },
		});
		revalidatePath("/");
		return { success: true, message: "Hero updated successfully" };
	} catch (error) {
		return { success: false, message: "Database error" };
	}
};

export const updateAboutAction = async (values: AboutFormValues) => {
	const validated = aboutSchema.safeParse(values);
	if (!validated.success)
		return { success: false, errors: validated.error.flatten().fieldErrors };

	const { corePillars, statuses, ...data } = validated.data;

	try {
		await db.$transaction(async (tx) => {
			await tx.aboutSection.upsert({
				where: { id: "about-static" },
				update: {
					...data,
					corePillars: { deleteMany: {}, create: corePillars },
					statuses: { deleteMany: {}, create: statuses },
				},
				create: {
					id: "about-static",
					...data,
					corePillars: { create: corePillars },
					statuses: { create: statuses },
				},
			});
		});
		revalidatePath("/");
		return { success: true, message: "About section synced" };
	} catch (error) {
		return { success: false, message: "Update failed" };
	}
};
export const upsertSkillCategoryAction = async (
	values: SkillCategoryFormValues,
	id?: string,
) => {
	const validated = skillCategorySchema.safeParse(values);
	if (!validated.success)
		return { success: false, errors: validated.error.flatten().fieldErrors };

	const { skills, ...data } = validated.data;

	try {
		await db.$transaction(async (tx) => {
			if (id) {
				await tx.skillCategory.update({
					where: { id },
					data: {
						...data,
						skills: { deleteMany: {}, create: skills },
					},
				});
			} else {
				await tx.skillCategory.create({
					data: {
						...data,
						skills: { create: skills },
					},
				});
			}
		});
		revalidatePath("/");
		return { success: true };
	} catch (error) {
		return { success: false, message: "Skill sync failed" };
	}
};
/** @format */

export const deleteSkillCategoryAction = async (id: string) => {
	try {
		// We use a transaction to ensure atomic deletion
		// (Prisma will handle the related skills if 'onDelete: Cascade' is set in your schema)
		await db.skillCategory.delete({
			where: {
				id,
			},
		});

		// Revalidate the path where skills are displayed
		revalidatePath("/");

		return {
			success: true,
			message: "Category and associated skills deleted successfully",
		};
	} catch (error) {
		console.error("Delete Error:", error);
		return {
			success: false,
			message:
				"Failed to delete category. It might not exist or there is a database error.",
		};
	}
};

import { experienceSchema } from "@/lib/validations";

export async function createExperienceAction(values: any) {
	const validated = experienceSchema.safeParse(values);
	if (!validated.success) return { error: "Invalid experience data" };

	const { techniques, ...rest } = validated.data;

	try {
		await db.experience.create({
			data: {
				...rest,
				techniques: {
					connect: techniques.map((id) => ({ id })),
				},
			},
		});

		revalidatePath("/dashboard/experience");
		revalidatePath("/");
		return { success: "Experience added!" };
	} catch (error) {
		return { error: "Failed to create experience." };
	}
}

export async function updateExperienceAction(id: string, values: any) {
	const validated = experienceSchema.safeParse(values);
	if (!validated.success) return { error: "Invalid data" };

	const { techniques, ...rest } = validated.data;

	try {
		await db.experience.update({
			where: { id },
			data: {
				...rest,
				techniques: {
					set: [], // Clear old techniques
					connect: techniques.map((id) => ({ id })),
				},
			},
		});

		revalidatePath("/");
		return { success: "Experience updated!" };
	} catch (error) {
		return { error: "Update failed." };
	}
}
export async function deleteExperiencAction(id: string) {
	try {
		await db.experience.delete({ where: { id } });
		revalidatePath("/dashboard/controls");
		return { success: true };
	} catch (error) {
		return { success: false };
	}
}
import { educationSchema, EducationFormValues } from "@/lib/validations";

export async function createEducationAction(
	values: EducationFormValues & { id?: string },
) {
	try {
		// 1. Validate the data server-side
		const validatedFields = educationSchema.safeParse(values);
		if (!validatedFields.success) return { error: "Invalid fields!" };

		const data = validatedFields.data;

		if (values.id) {
			// UPDATE existing record
			await db.education.update({
				where: { id: values.id },
				data: { ...data },
			});
		} else {
			// CREATE new record
			await db.education.create({
				data: { ...data },
			});
		}

		revalidatePath("/dashboard/controls");
		return { success: true };
	} catch (error) {
		console.error(error);
		return { success: false, error: "Database operation failed." };
	}
}
export async function deleteEducationAction(id: string) {
	try {
		await db.education.delete({ where: { id } });
		revalidatePath("/dashboard/controls");
		return { success: true };
	} catch (error) {
		return { success: false };
	}
}
