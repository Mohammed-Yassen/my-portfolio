/** @format */

"use client";

import { motion } from "framer-motion";
import { Layout, Server, Lock, Cpu } from "lucide-react";

const skillCategories = [
	{
		title: "Frontend Development",
		icon: <Layout className='w-5 h-5 text-blue-500' />,
		skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
	},
	{
		title: "Backend & Database",
		icon: <Server className='w-5 h-5 text-green-500' />,
		skills: [
			"Node.js",
			"PostgreSQL",
			"Prisma / Drizzle",
			"Supabase / Firebase",
		],
	},
	{
		title: "Research & Security",
		icon: <Lock className='w-5 h-5 text-red-500' />,
		skills: [
			"Intrusion Detection",
			"Network Security",
			"Data Analysis",
			"Python / ML",
		],
	},
	{
		title: "Architecture & Tools",
		icon: <Cpu className='w-5 h-5 text-purple-500' />,
		skills: ["Clean Architecture", "RESTful APIs", "Git / GitHub", "Docker"],
	},
];

export const SkillsSection = () => {
	return (
		<section id='skills' className='py-24 bg-background transition-colors'>
			<div className='container mx-auto px-6 md:px-12'>
				<div className='text-center max-w-2xl mx-auto mb-16'>
					<h2 className='text-3xl font-bold mb-4 italic'>
						Technical <span className='text-primary'>Expertise</span>
					</h2>
					<p className='text-muted-foreground'>
						Building secure, scalable, and research-backed digital solutions.
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{skillCategories.map((category, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: index * 0.1 }}
							className='p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300'>
							<div className='flex items-center gap-3 mb-6'>
								<div className='p-2 rounded-lg bg-muted dark:bg-muted/20'>
									{category.icon}
								</div>
								<h3 className='font-bold text-lg'>{category.title}</h3>
							</div>
							<ul className='space-y-3'>
								{category.skills.map((skill) => (
									<li
										key={skill}
										className='flex items-center text-muted-foreground group'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary/40 mr-3 group-hover:bg-primary transition-colors' />
										<span className='group-hover:text-foreground transition-colors'>
											{skill}
										</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
