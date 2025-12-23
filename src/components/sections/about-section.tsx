/** @format */

// /** @format */

// "use client";
/** @format */
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Code2, Microscope, Lightbulb } from "lucide-react";

const stats = [
	{ label: "Years Experience", value: "3+" },
	{ label: "Research Papers", value: "2" }, // Adjust based on your actual data
	{ label: "Projects Completed", value: "20+" },
	{ label: "Security Audits", value: "10+" },
];

const corePillars = [
	{
		icon: <Microscope className='w-6 h-6 text-primary' />,
		title: "Research-Driven",
		description:
			"Deep-diving into IDS models and machine learning to stay ahead of evolving cyber threats.",
	},
	{
		icon: <Code2 className='w-6 h-6 text-primary' />,
		title: "Full-Stack Engineering",
		description:
			"Building production-ready applications with Next.js, TypeScript, and scalable architectures.",
	},
	{
		icon: <ShieldCheck className='w-6 h-6 text-primary' />,
		title: "Security First",
		description:
			"Prioritizing zero-trust principles and robust intrusion detection in every line of code.",
	},
];
const container = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};
export const AboutSection = () => {
	return (
		<section id='about' className='py-24 bg-muted/20'>
			<div className='container mx-auto px-6'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className='space-y-6'>
						<h2 className='text-4xl font-bold tracking-tight'>
							A Hybrid Approach to <br />
							<span className='text-primary'>Problem Solving</span>
						</h2>
						<p className='text-lg text-muted-foreground leading-relaxed'>
							My background in <strong>Security Research</strong> allows me to
							approach web development with a "defense-in-depth" mindset.
						</p>
						{/* //{" "} */}
						<p>
							I am a specialized developer who believes that great software
							isn't just about syntax—it's about understanding the underlying
							data and security risks.
						</p>
						{/* Stats */}
						<div className='grid grid-cols-2 gap-6 pt-8'>
							<div className='border-l-2 border-primary pl-4'>
								<h4 className='text-3xl font-bold'>3+</h4>
								<p className='text-sm text-muted-foreground'>Years Exp.</p>
							</div>
							<div className='border-l-2 border-primary pl-4'>
								<h4 className='text-3xl font-bold'>20+</h4>
								<p className='text-sm text-muted-foreground'>Projects</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						variants={container}
						initial='hidden'
						whileInView='show'
						viewport={{ once: true }}
						className='space-y-4'>
						{corePillars.map((pillar, i) => (
							<motion.div
								key={i}
								variants={item}
								className='p-6 rounded-2xl border bg-card hover:bg-accent/50 transition-colors flex gap-4'>
								<div className='p-3 rounded-xl bg-primary/10 text-primary'>
									{pillar.icon}
								</div>
								<div>
									<h3 className='font-bold text-xl'>{pillar.title}</h3>
									<p className='text-muted-foreground'>{pillar.description}</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};
