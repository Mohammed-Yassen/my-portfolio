/** @format */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
	Plus,
	ArrowUpRight,
	Terminal,
	Layers,
	ShieldCheck,
	Zap,
	Sparkles,
	Cpu,
} from "lucide-react";
import { AboutWithRelations } from "@/type";
import { cn } from "@/lib/utils";

// Mapping icons to match your Zod Schema and Hero aesthetic
const ICON_MAP: Record<string, React.ElementType> = {
	Terminal: Terminal,
	Layers: Layers,
	ShieldCheck: ShieldCheck,
	Zap: Zap,
	Sparkles: Sparkles,
	Cpu: Cpu,
};

export const AboutSection = ({ data }: { data: AboutWithRelations | null }) => {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);

	const title = data?.title || "Building the Next Generation";
	const subtitle =
		data?.subtitle || "BRIDGING THE GAP BETWEEN COMPLEX LOGIC AND EXPERIENCE";
	const description =
		data?.description ||
		"I specialize in architecting solutions that aren't just functional—they're smart.";

	return (
		<section
			ref={sectionRef}
			id='about'
			className='relative  bg-background overflow-hidden'>
			{/* Background Grid - Matching your Hero image exactly */}
			<div
				className='absolute inset-0 z-0 opacity-[0.05]'
				style={{
					backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
					backgroundSize: "3rem 3rem",
				}}
			/>

			{/* Ambient Blue Glow (Matches Hero top-right) */}
			<div className='absolute top-0 right-0 w-125 h-125 bg-primary/10 blur-[120px] rounded-full -z-10' />

			<div className='container mx-auto px-6 relative z-10'>
				<div className='flex flex-col lg:flex-row gap-20'>
					{/* Left Content: Text & Stats */}
					<div className='lg:w-1/2 lg:sticky lg:top-32 h-fit'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='space-y-8'>
							{/* Accent Line + Subtitle */}
							<div className='flex items-center gap-4'>
								<div className='h-0.5 w-12 bg-primary/40' />
								<span className='text-primary font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold'>
									{subtitle}
								</span>
							</div>

							{/* Headline with "the" highlight style */}
							<h2 className='text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]'>
								{title.split(" ").map((word, i) => (
									<span
										key={i}
										className={cn(
											word.toLowerCase() === "the" &&
												"text-muted-foreground/30",
										)}>
										{word}{" "}
									</span>
								))}
								<span className='text-primary'>.</span>
							</h2>

							<p className='text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl'>
								{description}
							</p>

							{/* Stats Grid - Matching the Hero bottom-left style */}
							<div className='grid grid-cols-2 gap-y-10 gap-x-12 pt-6 border-t border-border/50'>
								{data?.statuses.map((status) => (
									<div key={status.id} className='relative group'>
										<div className='flex items-center gap-2 mb-1'>
											<span className='text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold'>
												{status.label}
											</span>
											<Plus
												size={10}
												className='text-primary/40 group-hover:rotate-90 transition-transform'
											/>
										</div>
										<div className='flex items-baseline gap-1'>
											<span className='text-4xl font-bold tracking-tighter group-hover:text-primary transition-colors'>
												{status.value}
											</span>
										</div>
										{/* Corner decoration to match the "+" in your image */}
										<Plus
											className='absolute -right-4 top-1/2 -translate-y-1/2 text-muted-foreground/10'
											size={16}
										/>
									</div>
								))}
							</div>
						</motion.div>
					</div>

					{/* Right Content: Modern Cards */}
					<div className='lg:w-1/2 space-y-6'>
						{data?.corePillars.map((pillar, idx) => {
							const Icon = ICON_MAP[pillar.icon] || Sparkles;
							return (
								<motion.div
									key={pillar.id || idx}
									style={{ rotate }}
									whileHover={{ x: 10 }}
									className='group relative bg-white/2 dark:bg-black/[0.02] border border-border/50 hover:border-primary/40 hover:bg-card transition-all duration-500 rounded-[2.5rem] p-8 md:p-10 shadow-sm'>
									<div className='flex gap-6 items-start'>
										{/* Circular Icon with Primary Glow */}
										<div className='relative shrink-0'>
											<div className='absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700' />
											<div className='relative size-14 rounded-full bg-background border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-inner'>
												<Icon size={24} />
											</div>
										</div>

										<div className='flex-1 space-y-2'>
											<div className='flex items-center justify-between'>
												<h3 className='text-xl md:text-2xl font-bold tracking-tight'>
													{pillar.title}
												</h3>
												<span className='text-[10px] font-mono text-muted-foreground/40 font-bold'>
													0{idx + 1}
												</span>
											</div>
											<p className='text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors'>
												{pillar.description}
											</p>
										</div>

										{/* Action Arrow */}
										<div className='hidden sm:flex size-10 rounded-full border border-border items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary transition-all'>
											<ArrowUpRight size={18} />
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
