/** @format */
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TestimonialTable } from "@/components/dashboard/testimonial-table";

export default async function AdminTestimonialsPage() {
	// 1. Senior Guard: Admin Only
	const session = await auth();
	// if (session?.user?.role !== "ADMIN") {
	// 	redirect("/"); // Kick non-admins out
	// }

	// 2. Fetch all testimonials (Newest first)
	const testimonials = await db.testimonial.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<div className='p-8 space-y-6'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold'>Testimonial Moderation</h1>
					<p className='text-muted-foreground'>
						Approve, feature, or delete client feedback.
					</p>
				</div>
			</div>

			<TestimonialTable data={testimonials} />
		</div>
	);
}
