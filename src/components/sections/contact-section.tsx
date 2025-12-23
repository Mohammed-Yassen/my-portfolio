/** @format */

"use client";

import * as React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// const formSchema = z.object({
// 	username: z.string().min(2, {
// 		message: "Username must be at least 2 characters.",
// 	}),
// });

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ContactSectionForm() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("Message sent!");
	};

	return (
		<section id='contact' className='py-24 bg-muted/20 dark:bg-transparent'>
			<div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center'>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}>
					<h2 className='text-4xl font-bold mb-4'>
						Get In <span className='text-primary'>Touch</span>
					</h2>
					<p className='text-muted-foreground text-lg leading-relaxed'>
						Have a complex research problem or a SaaS idea? Let’s build
						something
						<span className='text-primary font-semibold'> innovative</span>{" "}
						together.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}>
					<Card className='shadow-xl border-muted-foreground/10 bg-card/80 backdrop-blur-md'>
						<CardContent className='p-8'>
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div className='space-y-3'>
									<Label>I'm interested in...</Label>
									<RadioGroup
										defaultValue='frontend'
										className='flex flex-wrap gap-4'>
										{["frontend", "backend", "fullstack"].map((choice) => (
											<div key={choice} className='flex items-center space-x-2'>
												<RadioGroupItem value={choice} id={choice} />
												<Label htmlFor={choice} className='capitalize'>
													{choice}
												</Label>
											</div>
										))}
									</RadioGroup>
								</div>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label>Name</Label>
										<Input placeholder='Your Name' className='bg-background' />
									</div>
									<div className='space-y-2'>
										<Label>Email</Label>
										<Input
											type='email'
											placeholder='email@example.com'
											className='bg-background'
										/>
									</div>
								</div>

								<div className='space-y-2'>
									<Label>Message</Label>
									<Textarea
										placeholder='How can I help you?'
										rows={4}
										className='bg-background'
									/>
								</div>

								<Button
									type='submit'
									className='w-full h-12 text-lg font-medium shadow-lg shadow-primary/20'>
									Send Message
								</Button>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
