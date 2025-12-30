/** @format */
"use server";

import { db } from "@/lib/db/db";
import { blogSchema, BlogFormValues } from "@/lib/validations";
import { revalidatePath } from "next/cache";

/** @format */

// Helper to format tags for Prisma
const formatTags = (tags: { name: string }[]) => ({
	connectOrCreate: tags.map((tag) => ({
		where: { name: tag.name },
		create: { name: tag.name },
	})),
});

/**
 * CREATE BLOG
 */
export async function createBlogAction(values: BlogFormValues) {
	const validated = blogSchema.safeParse(values);
	if (!validated.success) return { success: false, message: "Invalid data" };

	const { tags, ...data } = validated.data;

	try {
		await db.blog.create({
			data: {
				...data,
				tags: formatTags(tags),
			},
		});

		revalidatePaths();
		return { success: true };
	} catch (error) {
		return { success: false, message: "Failed to create blog" };
	}
}

/**
 * UPDATE BLOG
 */
export async function updateBlogAction(id: string, values: BlogFormValues) {
	const validated = blogSchema.safeParse(values);
	if (!validated.success) return { success: false, message: "Invalid data" };

	const { tags, ...data } = validated.data;

	try {
		await db.blog.update({
			where: { id },
			data: {
				...data,
				tags: {
					set: [], // Disconnect old tags first
					...formatTags(tags),
				},
			},
		});

		revalidatePaths();
		return { success: true };
	} catch (error) {
		return { success: false, message: "Failed to update blog" };
	}
}

export async function deleteBlogAction(id: string) {
	try {
		// Find project first to get slug for cache clearing if necessary
		const blogs = await db.blog.delete({ where: { id } });

		revalidatePaths();

		return { success: "Blogs removed permanently." };
	} catch (error) {
		console.error("DELETE_BLOGS_ERROR:", error);
		return { error: "Unable to delete blogs." };
	}
}
function revalidatePaths() {
	revalidatePath("/admin/blogs");
	revalidatePath("/blogs");
	revalidatePath("/");
}
