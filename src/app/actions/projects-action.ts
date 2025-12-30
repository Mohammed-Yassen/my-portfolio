/** @format */
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/db";
import { ProjectFormValues, projectSchema } from "@/lib/validations";

/**
 * HELPER: Sync Relations
 * Uses upsert to ensure names are unique and shared across projects.
 */
async function syncRelations(
	items: { name: string; icon?: string | null }[],
	type: "technique" | "tag", // Note: mapping to the correct prisma model name
) {
	return Promise.all(
		items.map(async (item) => {
			const name = item.name.trim();
			// Prisma upsert requires a unique field. If your schema doesn't have
			// @unique on 'name', findFirst + create is necessary, but upsert is preferred.
			const record = await (db[type] as any).upsert({
				where: { name },
				update: type === "technique" ? { icon: item.icon } : {},
				create:
					type === "technique" ? { name, icon: item.icon || "Code" } : { name },
			});
			return { id: record.id };
		}),
	);
}

/**
 * CREATE PROJECT
 */
export async function createProject(values: ProjectFormValues) {
	const validated = projectSchema.safeParse(values);
	if (!validated.success)
		return { error: "Validation failed. Please check your inputs." };

	const { techniques, tags, ...rest } = validated.data;

	try {
		const [techIds, tagIds] = await Promise.all([
			syncRelations(techniques, "technique"),
			syncRelations(tags, "tag"),
		]);

		const project = await db.project.create({
			data: {
				...rest,
				techniques: { connect: techIds },
				tags: { connect: tagIds },
			},
		});

		revalidatePaths();
		return { success: "Project created successfully!", data: project };
	} catch (error: any) {
		console.error("CREATE_PROJECT_ERROR:", error);
		if (error.code === "P2002")
			return { error: "A project with this slug already exists." };
		return { error: "Something went wrong while creating the project." };
	}
}

/**
 * UPDATE PROJECT
 */
export async function updateProject(id: string, values: ProjectFormValues) {
	const validated = projectSchema.safeParse(values);
	if (!validated.success) return { error: "Validation failed." };

	const { techniques, tags, ...rest } = validated.data;

	try {
		const [techIds, tagIds] = await Promise.all([
			syncRelations(techniques, "technique"),
			syncRelations(tags, "tag"),
		]);

		await db.project.update({
			where: { id },
			data: {
				...rest,
				techniques: {
					set: [], // Wipes existing joins
					connect: techIds, // Re-connects current list
				},
				tags: {
					set: [],
					connect: tagIds,
				},
			},
		});

		// Targeted revalidation
		revalidatePaths();
		revalidatePath(`/projects/${rest.slug}`);

		return { success: "Project updated successfully!" };
	} catch (error) {
		console.error("UPDATE_PROJECT_ERROR:", error);
		return { error: "Failed to update project." };
	}
}

/**
 * DELETE PROJECT
 */
export async function deleteProject(id: string) {
	try {
		// Find project first to get slug for cache clearing if necessary
		const project = await db.project.delete({ where: { id } });

		revalidatePaths();
		revalidatePath(`/projects/${project.slug}`);

		return { success: "Project removed permanently." };
	} catch (error) {
		console.error("DELETE_PROJECT_ERROR:", error);
		return { error: "Unable to delete project." };
	}
}
function revalidatePaths() {
	revalidatePath("/dashboard/projects");
	revalidatePath("/");
}
