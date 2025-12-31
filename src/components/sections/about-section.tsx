/** @format */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
	Plus,
	ArrowUpRight,
	Terminal,
	Layers,
	ShieldCheck,
	Zap,
	Sparkles,
	Cpu,
	LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FullAboutSection } from "@/types";

// Expanded Icon Map to support dynamic selection from IconPicker
const ICON_MAP: Record<string, LucideIcon> = {
	Terminal,
	Layers,
	ShieldCheck,
	Zap,
	Sparkles,
	Cpu,
};
interface AboutSectionFieldsProps {
	aboutData: FullAboutSection | null;
}
export const AboutSection = ({ aboutData }: AboutSectionFieldsProps) => {
	const sectionRef = useRef<HTMLElement>(null);

	// Scroll progress for subtle parallax on the right-hand cards
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
	const rotateParallax = useTransform(scrollYProgress, [0, 1], [2, -2]);

	const title = aboutData?.title || "Building the Next Generation";
	const subtitle =
		aboutData?.subtitle || "BRIDGING THE GAP BETWEEN LOGIC AND EXPERIENCE";
	const description =
		aboutData?.description ||
		"I specialize in architecting solutions that aren't just functional—they're smart.";

	return (
		<section
			ref={sectionRef}
			id='about'
			className='relative py-24 md:py-32 bg-background overflow-hidden'>
			{/* Background Grid - Fixed size for consistent technical look */}
			<div
				className='absolute inset-0 z-0 opacity-[0.03] pointer-events-none'
				style={{
					backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
					backgroundSize: "4rem 4rem",
				}}
			/>

			{/* Ambient Primary Glow */}
			<div className='absolute -top-24 -right-24 size-125 bg-primary/5 blur-[120px] rounded-full -z-10' />

			<div className='container mx-auto px-6 relative z-10'>
				<div className='flex flex-col lg:flex-row gap-12 lg:gap-24'>
					{/* LEFT CONTENT: Sticky Header & Statistics */}
					<div className='lg:w-[50%] lg:sticky lg:top-24 h-fit'>
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className='space-y-8'>
							<div className='flex items-center gap-4'>
								<div className='h-0.5 w-10 bg-primary' />
								<span className='text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-bold'>
									{subtitle}
								</span>
							</div>

							<h2 className='text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]'>
								{title.split(" ").map((word: string, i: number) => (
									<span
										key={i}
										className={cn(
											"inline-block mr-3",
											word.toLowerCase() === "the" &&
												"text-muted-foreground/20 italic font-light",
										)}>
										{word}
									</span>
								))}
								<span className='text-primary'>.</span>
							</h2>
							<p className='text-lg text-muted-foreground leading-relaxed max-w-md border-l-2 border-primary/10 pl-6'>
								{description}
							</p>

							{/* Stats Grid */}
							<div className='grid grid-cols-2 gap-8 pt-10 px-4'>
								{aboutData?.statuses?.map((status: any) => (
									<div key={status.id} className='relative group'>
										<div className='flex items-center gap-2 mb-2'>
											<span className='text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest'>
												{status.label}
											</span>
											<Plus
												size={10}
												className='text-primary transition-transform group-hover:rotate-90'
											/>
										</div>
										<div className='flex items-baseline'>
											<span className='text-3xl font-bold tracking-tighter tabular-nums transition-colors group-hover:text-primary'>
												{status.value}
											</span>
										</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>

					{/* RIGHT CONTENT: Pillar Cards with Hover & Parallax */}
					<div className='lg:w-[45%] space-y-8'>
						{aboutData?.corePillars?.map((pillar: any, idx: number) => {
							const Icon = ICON_MAP[pillar.icon] || Sparkles;
							return (
								<motion.div
									key={pillar.id || idx}
									style={{ y: yParallax, rotate: rotateParallax }}
									className='group relative'>
									<div className='absolute -inset-px bg-linear-to-r from-transparent via-border to-transparent rounded-4xl opacity-50 group-hover:via-primary/50 transition-all duration-500' />

									<div className='relative bg-card/50 backdrop-blur-sm border border-border/40 hover:bg-card transition-all duration-500 rounded-4xl p-4 md:p-6'>
										<div className='flex gap-4 items-start'>
											{/* Technical Icon Wrapper */}
											<div className='relative shrink-0'>
												<div className='absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
												<div className='relative size-16 rounded-2xl bg-background border-2 border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-all duration-500'>
													<Icon size={30} strokeWidth={1.5} />
													<div className='absolute -top-1 -right-1 size-2 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform' />
												</div>
											</div>

											<div className='flex-1 space-y-2'>
												<div className='flex items-center justify-between'>
													<h3 className='text-2xl font-bold tracking-tight'>
														{pillar.title}
													</h3>
													<span className='font-mono text-xs text-muted-foreground/30'>
														[{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}]
													</span>
												</div>
												<p className='text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors'>
													{pillar.description}
												</p>
											</div>

											{/* Action Decoration */}
											<div className='hidden xl:flex size-12 rounded-full border border-border items-center justify-center text-muted-foreground group-hover:scale-110 group-hover:text-primary group-hover:border-primary transition-all duration-500'>
												<ArrowUpRight size={20} />
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
