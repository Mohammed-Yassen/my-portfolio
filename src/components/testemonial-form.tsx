/** @format */
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, TestimonialFormValues } from "@/lib/validations";
import { createTestimonialAction } from "@/actions/testimonial";
import { useTransition } from "react";
import { Star, Loader2, Linkedin } from "lucide-react";
import { toast } from "sonner";

// Shadcn & Custom Components
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormFieldWrapper } from "./input-form-wrapper";
import Image from "next/image";

interface TestimonialFormProps {
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export function TestimonialForm({ user }: TestimonialFormProps) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<TestimonialFormValues>({
		resolver: zodResolver(testimonialSchema) as any,
		defaultValues: {
			clientName: user.name || "",
			email: user.email || "",
			avatarUrl: user.image || "", // Pre-fill their profile picture
			rating: 5,
			content: "",
			clientTitle: "",
			role: "",
			linkedinUrl: "",
		},
	});

	const onSubmit = async (data: TestimonialFormValues) => {
		startTransition(async () => {
			const toastId = toast.loading("Submitting...");
			const result = await createTestimonialAction(data);
			if (result?.error) {
				toast.error(result.error, { id: toastId });
			} else {
				toast.success("Testimonial sent!", { id: toastId });
				form.reset();
			}
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 bg-card p-10 rounded-4xl border shadow-xl'>
				{/* Visual feedback of the user being logged in */}
				<div className='flex items-center gap-4 p-4 bg-muted/50 rounded-2xl mb-6'>
					{user.image && (
						<Image
							src={user?.image || "/profile.jpg"}
							alt='Profile'
							width={50}
							height={50}
							className='w-12 h-12 rounded-full border-2 border-primary'
						/>
					)}
					<div>
						<p className='text-sm font-bold'>{user.name}</p>
						<p className='text-xs text-muted-foreground'>{user.email}</p>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='clientName'
						label='Display Name'>
						{(field) => <Input {...field} disabled={isPending} />}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='email'
						label='Contact Email'>
						{(field) => (
							<Input
								{...field}
								disabled={true}
								className='bg-muted cursor-not-allowed'
							/>
						)}
					</FormFieldWrapper>
				</div>
				<div className='grid grid-cols-1  gap-6'>
					<FormFieldWrapper
						control={form.control}
						name='clientTitle'
						label='Your Title'>
						{(field) => (
							<Input
								{...field}
								placeholder='e.g. Acme Corp'
								disabled={isPending}
								className='h-14'
							/>
						)}
					</FormFieldWrapper>

					<FormFieldWrapper
						control={form.control}
						name='role'
						label='Your Role'>
						{(field) => (
							<Input
								{...field}
								placeholder='e.g. Senior Manager'
								disabled={isPending}
								className='h-14'
							/>
						)}
					</FormFieldWrapper>
				</div>

				<FormFieldWrapper
					control={form.control}
					name='content'
					label='Feedback'>
					{(field) => (
						<Textarea
							{...field}
							placeholder='How was your experience working with me?'
							disabled={isPending}
							className='rounded-xl min-h-30 resize-none'
						/>
					)}
				</FormFieldWrapper>

				{/* Optional LinkedIn Field */}
				<FormFieldWrapper
					control={form.control}
					name='linkedinUrl'
					label='LinkedIn Profile (Optional)'>
					{(field) => (
						<div className='relative'>
							<Linkedin className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
							<Input
								{...field}
								placeholder='https://linkedin.com/in/...'
								disabled={isPending}
								className='pl-10 rounded-xl'
							/>
						</div>
					)}
				</FormFieldWrapper>

				{/* Star Rating Selection */}
				<div className='space-y-3'>
					<label className='text-sm font-semibold text-zinc-700 dark:text-zinc-300'>
						Rating
					</label>
					<div className='flex gap-2'>
						{[1, 2, 3, 4, 5].map((num) => (
							<button
								key={num}
								type='button'
								onClick={() => form.setValue("rating", num)}
								className={`p-2 rounded-xl border transition-all hover:scale-105 ${
									form.watch("rating") >= num
										? "bg-yellow-400/10 border-yellow-400 text-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.2)]"
										: "bg-muted text-muted-foreground opacity-50"
								}`}>
								<Star
									className='w-6 h-6'
									fill={form.watch("rating") >= num ? "currentColor" : "none"}
								/>
							</button>
						))}
					</div>
				</div>

				<Button
					type='submit'
					disabled={isPending}
					className='w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-all active:scale-[0.98]'>
					{isPending ? (
						<span className='flex items-center gap-2'>
							<Loader2 className='animate-spin' /> Submitting...
						</span>
					) : (
						"Submit Testimonial"
					)}
				</Button>
			</form>
		</Form>
	);
}
