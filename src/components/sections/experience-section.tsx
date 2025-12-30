/** @format */

"use client";

import { ExperienceWithRelations } from "@/type";
import { Education } from "@prisma/client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

interface expEducSectionProps {
	expData: ExperienceWithRelations[];
	educData: Education[];
}

// Helper to format Prisma Dates
const formatDate = (date: Date | null) => {
	if (!date) return "Present";
	return new Date(date).getFullYear().toString();
	// Or use .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
};

export const ExperienceEducationSection = ({
	expData,
	educData,
}: expEducSectionProps) => {
	return (
		<section
			id='experience'
			className='py-24 bg-background relative overflow-hidden'>
			<div className='absolute top-1/4 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none' />
			<div className='absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none' />

			<div className='container mx-auto px-6 max-w-6xl'>
				<div className='grid md:grid-cols-2 gap-16 relative'>
					{/* EXPERIENCE COLUMN */}
					<div className='space-y-12'>
						<motion.h2
							initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							className='text-3xl font-bold flex items-center gap-4 group'>
							<div className='p-2 rounded-xl bg-primary/10 text-primary group-hover:rotate-12 transition-transform'>
								<Briefcase size={28} />
							</div>
							Experience
						</motion.h2>

						<div className='relative border-l-2 border-muted ml-4 space-y-12'>
							{expData.map((exp, i) => (
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: i * 0.1 }}
									key={exp.id || i}
									className='relative pl-10 group'>
									<div className='absolute w-5 h-5 bg-background border-2 border-primary rounded-full -left-[11px] top-1 z-10 group-hover:bg-primary transition-colors duration-300'>
										<div className='w-full h-full rounded-full bg-primary animate-ping opacity-20 group-hover:opacity-40' />
									</div>

									<div className='space-y-2 p-6 rounded-2xl border border-transparent hover:border-muted hover:bg-muted/30 transition-all duration-300'>
										<div className='flex items-center gap-2 text-primary text-sm font-semibold tracking-wider'>
											<Calendar size={14} />
											{formatDate(exp.startDate)} — {formatDate(exp.endDate)}
										</div>
										<h3 className='text-xl font-bold text-foreground'>
											{exp.role}
										</h3>
										<h4 className='text-lg font-medium text-muted-foreground'>
											{exp.companyName}
										</h4>
										{exp.description && (
											<p className='text-muted-foreground leading-relaxed pt-2 border-t border-muted/50'>
												{exp.description}
											</p>
										)}
									</div>
								</motion.div>
							))}
						</div>
					</div>

					{/* EDUCATION COLUMN */}
					<div className='space-y-12'>
						<motion.h2
							initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							className='text-3xl font-bold flex items-center gap-4 group'>
							<div className='p-2 rounded-xl bg-primary/10 text-primary group-hover:rotate-12 transition-transform'>
								<GraduationCap size={28} />
							</div>
							Education
						</motion.h2>

						<div className='relative border-l-2 border-muted ml-4 space-y-12'>
							{educData.map((educ, i) => (
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: i * 0.1 }}
									key={educ.id || i}
									className='relative pl-10 group'>
									<div className='absolute w-5 h-5 bg-background border-2 border-primary rounded-full -left-[11px] top-1 z-10 group-hover:bg-primary transition-colors duration-300' />

									<div className='space-y-2 p-6 rounded-2xl border border-transparent hover:border-muted hover:bg-muted/30 transition-all duration-300'>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2 text-primary text-sm font-semibold tracking-wider'>
												<Calendar size={14} />
												{formatDate(educ.startDate)} —{" "}
												{formatDate(educ.endDate)}
											</div>
											<h3 className='text-lg font-bold text-primary '>
												{educ.degree}
											</h3>
										</div>
										<h4 className='text-xl font-bold text-foreground'>
											{educ.institution}
										</h4>
										<p className='text-sm italic text-muted-foreground/80'>
											{educ.fieldOfStudy}
										</p>
										{educ.description && (
											<p className='text-muted-foreground leading-relaxed pt-2 border-t border-muted/50'>
												{educ.description}
											</p>
										)}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
