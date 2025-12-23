/** @format */

"use server";

import { db } from "@/lib/db";
import { identitySchema, IdentityFormValues } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function updateIdentity(values: IdentityFormValues) {
	const validated = identitySchema.safeParse(values);
	if (!validated.success) return { error: "Validation failed" };

	const { hero, about } = validated.data;
	const { corePillars, ...aboutData } = about;

	try {
		await db.$transaction(async (tx) => {
			// 1. Update Hero
			await tx.heroSection.upsert({
				where: { id: "hero-static" },
				update: hero,
				create: { id: "hero-static", ...hero },
			});

			// 2. Update About
			const updatedAbout = await tx.aboutSection.upsert({
				where: { id: "default-about" },
				update: aboutData,
				create: { id: "default-about", ...aboutData },
			});

			// 3. Replace Pillars (Atomic delete/create)
			await tx.corePillars.deleteMany({
				where: { aboutSectionId: updatedAbout.id },
			});

			await tx.corePillars.createMany({
				data: corePillars.map((p) => ({
					title: p.title,
					description: p.description,
					icon: p.icon,
					aboutSectionId: updatedAbout.id,
				})),
			});
		});

		revalidatePath("/");
		revalidatePath("/dashboard/identity");
		return { success: "Identity synchronized successfully!" };
	} catch (error) {
		console.error(error);
		return { error: "Database synchronization failed" };
	}
}
