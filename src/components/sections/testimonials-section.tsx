/** @format */

"use client";

import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { MotionViewport } from "../motion-viewport";

const IconArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth={2}
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}>
		<path d='M15 18l-6-6 6-6' />
	</svg>
);

const IconArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth={2}
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}>
		<path d='M9 6l6 6-6 6' />
	</svg>
);

const FAKE_TESTIMONIALS = [
	{
		name: "Alex Rivera",
		designation: "CTO @ TechPulse",
		quote:
			"The system architecture delivered was beyond our expectations. Scaling from 10k to 100k users was seamless thanks to the robust foundation.",
		src: "/p1.jpg",
	},
	{
		name: "Sarah Jenkins",
		designation: "Founder of CreativeCo",
		quote:
			"Most developers just build what you ask. This team actually thinks about the end-user experience. The animations are buttery smooth.",
		src: "/p2.jpg",
	},
	{
		name: "Michael Chen",
		designation: "Security Lead @ Vault",
		quote:
			"Incredible attention to security protocols. It is rare to find a frontend specialist who understands backend vulnerabilities so well.",
		src: "/p3.png",
	},
	{
		name: "Emma Volkov",
		designation: "Product Manager @ Solar",
		quote:
			"Clean, maintainable code. Our internal team was able to pick up the project and continue development without any friction.",
		src: "/profile.jpg",
	},
	{
		name: "David Miller",
		designation: "Director @ Swiftly",
		quote:
			"The UI redesign lead to a 40% increase in user retention. The visual hierarchy and performance optimizations were key.",
		src: "/p4.png",
	},
	{
		name: "Leila Ortiz",
		designation: "HR Director @ SkyNet",
		quote:
			"Professional, punctual, and highly skilled. A collaborative partner who truly cares about the project success.",
		src: "/p2.jpg",
	},
];

type Testimonial = {
	quote: string;
	name: string;
	designation: string;
	src: string;
};

// --- Sub-Component: AnimatedTestimonials (The Aceternity Logic) ---
export const AnimatedTestimonials = ({
	testimonials,
	autoplay = false,
}: {
	testimonials: Testimonial[];
	autoplay?: boolean;
}) => {
	const [active, setActive] = useState(0);
	const [mounted, setMounted] = useState(false);

	// Generate stable random rotations only once on the client to avoid hydration errors
	const rotations = useMemo(
		() => testimonials.map(() => Math.floor(Math.random() * 32) - 10),
		[testimonials],
	);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleNext = useCallback(() => {
		setActive((prev) => (prev + 1) % testimonials.length);
	}, [testimonials.length]);

	const handlePrev = () => {
		setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	useEffect(() => {
		if (autoplay && mounted) {
			const interval = setInterval(handleNext, 5000);
			return () => clearInterval(interval);
		}
	}, [autoplay, handleNext, mounted]);

	// Prevent hydration mismatch: render nothing until client-side mount
	if (!mounted) return <div className='h-80' />;

	return (
		<div className='max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20'>
			<div className='relative grid grid-cols-1 md:grid-cols-2 gap-20'>
				<div>
					<div className='relative h-80 w-full'>
						<AnimatePresence mode='popLayout'>
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={`${testimonial.name}-${index}`}
									initial={{
										opacity: 0,
										scale: 0.9,
										z: -100,
										rotate: rotations[index],
									}}
									animate={{
										opacity: index === active ? 1 : 0.7,
										scale: index === active ? 1 : 0.95,
										z: index === active ? 0 : -100,
										rotate: index === active ? 0 : rotations[index],
										zIndex:
											index === active ? 999 : testimonials.length + 2 - index,
										y: index === active ? [0, -80, 0] : 0,
									}}
									exit={{
										opacity: 0,
										scale: 0.9,
										z: 100,
										rotate: rotations[index],
									}}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
									className='absolute inset-0  p-1 b'>
									<Image
										src={testimonial.src}
										alt={testimonial.name}
										width={500}
										height={500}
										draggable={false}
										className='h-full w-full rounded-3xl object-cover  shadow-2xl border border-white/10'
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
				<div className='flex justify-between flex-col py-4'>
					<motion.div
						key={active}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}>
						<h3 className='text-2xl font-bold text-foreground'>
							{testimonials[active].name}
						</h3>
						<p className='text-sm text-muted-foreground'>
							{testimonials[active].designation}
						</p>
						<motion.p className='text-lg text-muted-foreground mt-8 leading-relaxed'>
							{testimonials[active].quote.split(" ").map((word, index) => (
								<motion.span
									key={`${active}-${index}`}
									initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
									animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
									transition={{
										duration: 0.2,
										ease: "easeInOut",
										delay: 0.02 * index,
									}}
									className='inline-block'>
									{word}&nbsp;
								</motion.span>
							))}
						</motion.p>
					</motion.div>
					<div className='flex gap-4 pt-12 md:pt-0'>
						<button
							onClick={handlePrev}
							className='h-10 w-10 rounded-full bg-secondary flex items-center justify-center group/button transition-all hover:bg-primary'>
							<IconArrowLeft className='h-5 w-5 text-foreground group-hover/button:text-primary-foreground transition-transform group-hover/button:-rotate-12' />
						</button>
						<button
							onClick={handleNext}
							className='h-10 w-10 rounded-full bg-secondary flex items-center justify-center group/button transition-all hover:bg-primary'>
							<IconArrowRight className='h-5 w-5 text-foreground group-hover/button:text-primary-foreground transition-transform group-hover/button:rotate-12' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// --- Main Export: TestimonialsSection ---
export function TestimonialsSection() {
	return (
		<section
			id='testimonials'
			className='py-24 bg-background relative overflow-hidden'>
			<div className='container mx-auto px-6 max-w-6xl'>
				<div className='text-center mb-12'>
					<MotionViewport preset='scaleUp'>
						<h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tighter'>
							What <span className='text-primary'>Clients</span> Say
						</h2>
						<div className='h-1 w-20 bg-primary mx-auto rounded-full mb-6' />
						<p className='text-muted-foreground text-lg max-w-2xl mx-auto font-medium'>
							Trusted by founders and engineering teams to build
							high-performance products.
						</p>
					</MotionViewport>
				</div>

				<div className='relative'>
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full -z-10' />
					<AnimatedTestimonials
						testimonials={FAKE_TESTIMONIALS}
						autoplay={true}
					/>
				</div>
			</div>
		</section>
	);
}
