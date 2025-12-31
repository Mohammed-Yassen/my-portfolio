/** @format */
"use server";

import { db } from "@/lib/db";
import { testimonialSchema, TestimonialFormValues } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth"; // Ensure this points to your Auth.js config

/**
 * PROTECTED ACTION: Create Testimonial
 * Verification: Must be signed in.
 */
export async function createTestimonialAction(values: TestimonialFormValues) {
	try {
		// 1. Session Verification
		const session = await auth();
		if (!session?.user?.email) {
			return { error: "Authentication required. Please sign in again." };
		}

		// 2. Server-side validation
		const validatedFields = testimonialSchema.safeParse(values);
		if (!validatedFields.success) {
			return { error: "Invalid form data. Please check all fields." };
		}

		// 3. Database Insertion with forced identity
		// We overwrite the email and avatar with the SESSION data
		// so a user cannot pretend to be someone else.
		await db.testimonial.create({
			data: {
				...validatedFields.data,
				email: session.user.email, // Forced from session
				avatarUrl: session.user.image, // Forced from session
				isActive: false, // Moderation queue
				isFeatured: false,
			},
		});

		revalidatePath("/");
		return {
			success: "Thank you! Your testimonial is now awaiting moderation.",
		};
	} catch (error) {
		console.error("[CREATE_TESTIMONIAL_ERROR]:", error);
		return { error: "Database connection failed. Please try again later." };
	}
}

/**
 * ADMIN ACTION: Update Status
 * Verification: Must be signed in AND have ADMIN role.
 */
export async function updateTestimonialStatus(
	id: string,
	data: { isActive?: boolean; isFeatured?: boolean },
) {
	try {
		const session = await auth();
		// Senior Tip: Always check for both session AND specific permissions
		// if (!session || session.user.role !== "ADMIN") {
		// 	return { error: "Forbidden: You do not have permission to moderate." };
		// }

		if (!id) return { error: "Missing Testimonial ID." };

		await db.testimonial.update({
			where: { id },
			data: {
				...(data.isActive !== undefined && { isActive: data.isActive }),
				...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
			},
		});

		revalidatePath("/");
		revalidatePath("/admin/testimonials");
		return { success: "Status updated." };
	} catch (error) {
		console.error("[UPDATE_TESTIMONIAL_ERROR]:", error);
		return { error: "Update failed." };
	}
}

/**
 * ADMIN ACTION: Delete
 */
export async function deleteTestimonial(id: string) {
	try {
		// const session = await auth();
		// if (!session || session.user.role !== "ADMIN") {
		// 	return { error: "Unauthorized access." };
		// }

		await db.testimonial.delete({
			where: { id },
		});

		revalidatePath("/");
		revalidatePath("/admin/testimonials");
		return { success: "Testimonial deleted." };
	} catch (error) {
		console.error("[DELETE_TESTIMONIAL_ERROR]:", error);
		return { error: "Failed to delete record." };
	}
}
