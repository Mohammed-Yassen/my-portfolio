/** @format */

"use client";

import { SkillCategoryWithSkills } from "@/types";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface SkillsSectionProps {
	data: SkillCategoryWithSkills[];
}

// Helper to determine color based on skill level
const getLevelColor = (level: number | null) => {
	if (level && level >= 90) return "from-emerald-500 to-teal-400"; // Expert
	if (level && level >= 70) return "from-blue-500 to-cyan-400"; // Advanced
	if (level && level >= 50) return "from-amber-500 to-orange-400"; // Intermediate
	return "from-rose-500 to-pink-400"; // Beginner
};

export const SkillsSection = ({ data }: SkillsSectionProps) => {
	return (
		<section id='skills' className='py-24 bg-background transition-colors'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='mb-16 flex items-center justify-center flex-col '>
					<motion.h2
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						className='text-4xl font-bold tracking-tight '>
						Technical <span className='text-primary italic'>Expertise</span>
					</motion.h2>
					<div className='h-1 w-20  bg-primary my-2 rounded-full' />
					<p className='text-muted-foreground  '>
						Building secure, scalable, and research-backed digital solutions.
					</p>
				</div>

				{/* Responsive Grid: Auto-fills based on available width */}
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-6'>
					{data.map((category, catIndex) => {
						const IconComponent =
							(LucideIcons as any)[category.icon] || LucideIcons.Layers;

						return (
							<motion.div
								key={category.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: catIndex * 0.05 }}
								className='group flex flex-col h-full p-6 rounded-2xl border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300'>
								{/* Header with Glass Effect Icon */}
								<div className='flex items-center gap-4 mb-8'>
									<div className='relative'>
										<div className='absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity' />
										<div className='relative p-3 rounded-xl bg-muted dark:bg-zinc-900 border text-primary'>
											<IconComponent size={24} />
										</div>
									</div>
									<h3 className='font-bold text-lg tracking-wide'>
										{category.title}
									</h3>
								</div>

								{/* Skill Bars */}
								<div className='space-y-5 grow'>
									{category.skills.map((skill, skillIndex) => (
										<div key={skill.id} className='group/skill'>
											<div className='flex justify-between items-center mb-1.5'>
												<span className='text-sm font-medium text-muted-foreground group-hover/skill:text-foreground transition-colors'>
													{skill.name}
												</span>
												<span className='text-[10px] font-mono font-bold opacity-0 group-hover/skill:opacity-100 transition-opacity'>
													{skill.level}%
												</span>
											</div>

											{/* Track */}
											<div className='h-1 w-full bg-muted rounded-full overflow-hidden'>
												{/* Progress with Spring Animation */}
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: `${skill.level}%` }}
													viewport={{ once: true }}
													transition={{
														type: "spring",
														bounce: 0,
														duration: 1.5,
														delay: 0.2 + skillIndex * 0.1,
													}}
													className={`h-full rounded-full bg-linear-to-r ${getLevelColor(
														skill?.level,
													)}`}
												/>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
