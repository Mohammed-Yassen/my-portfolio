/** @format */

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MotionViewport } from "@/components/motion-viewport";
import { TestimonialForm } from "@/components/testemonial-form";

export default async function NewTestimonialPage() {
	const session = await auth();

	if (!session?.user) {
		redirect("/api/auth/signin?callbackUrl=/testimonials/new");
	}

	return (
		<main className='min-h-screen py-24 bg-background'>
			<div className='container max-w-2xl mx-auto px-6'>
				<MotionViewport preset='scaleUp'>
					<div className='text-center mb-12'>
						<h1 className='text-4xl font-bold tracking-tight mb-4'>
							Share Your Experience
						</h1>
						<p className='text-muted-foreground'>
							We've pre-filled your details from your account.
						</p>
					</div>

					{/* Passing user data to the client component */}
					<TestimonialForm user={session.user} />
				</MotionViewport>
			</div>
		</main>
	);
}
