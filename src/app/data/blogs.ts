/** @format */
import { db } from "@/lib/db/db"; // Adjust path to your Prisma instance
import { blogInclude } from "@/type/blogs-type";

export async function getBlogs() {
	return await db.blog.findMany({
		where: { isPublished: true },
		orderBy: { publishedAt: "desc" },
		include: blogInclude,
	});
}

export async function getBlogById(id: string) {
	if (!id) return null; // Safety check

	return await db.blog.findUnique({
		where: { id }, // This 'id' must match your Prisma Schema field name
		include: blogInclude,
	});
}
