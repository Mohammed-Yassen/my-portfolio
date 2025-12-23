/** @format */

"use client";

import React from "react";
import {
	ArrowRight,
	Download,
	Github,
	Linkedin,
	Mail,
	Shield,
	Code,
	Search,
	Cpu,
	Zap,
	Binary,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mapping icons for the Core Pillars
const ICON_MAP: Record<string, any> = {
	Shield: Shield,
	Code: Code,
	Search: Search,
	Cpu: Cpu,
	Zap: Zap,
	Binary: Binary,
};

export function PreviewMobile({ hero, about }: { hero: any; about: any }) {
	return (
		<div className='lg:col-span-5 flex justify-center lg:sticky lg:top-12'>
			{/* Phone Frame */}
			<div className='w-80 aspect-9/19 bg-white dark:bg-zinc-950 rounded-[3rem] border-8 border-zinc-900 dark:border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col'>
				{/* Notch */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-3xl z-50 flex items-center justify-center'>
					<div className='w-10 h-1 bg-zinc-800 rounded-full' />
				</div>

				{/* Scrollable Container */}
				<div className='flex-1 overflow-y-auto no-scrollbar scroll-smooth'>
					{/* --- HERO SECTION PREVIEW --- */}
					<section className='px-7 pt-16 pb-10 space-y-6 border-b border-zinc-100 dark:border-zinc-900'>
						<div className='flex justify-center'>
							<div className='relative w-36 h-36 rounded-full border-4 border-white dark:border-zinc-800 overflow-hidden shadow-xl'>
								<img
									src={hero?.primaryImage || "/api/placeholder/400/400"}
									className='w-full h-full object-cover'
									alt='Avatar'
								/>
							</div>
						</div>

						<div className='text-center space-y-2'>
							<h1 className='text-xl font-black tracking-tight dark:text-zinc-100'>
								{hero?.greeting || "Hello,"}{" "}
								<span className='text-blue-600'>
									{hero?.name || "Your Name"}
								</span>
							</h1>
							<div className='bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full inline-block'>
								<p className='text-[10px] font-black uppercase tracking-widest text-zinc-500'>
									{hero?.role || "Fullstack Developer"}
								</p>
							</div>
						</div>

						<p className='text-xs text-center text-zinc-500 leading-relaxed italic line-clamp-3'>
							"
							{hero?.description || "Your hero description will appear here..."}
							"
						</p>

						<div className='flex flex-col gap-2'>
							<div className='h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white text-[10px] font-bold gap-2'>
								{hero?.ctaText || "Let's Talk"} <ArrowRight size={14} />
							</div>
						</div>
					</section>

					{/* --- ABOUT SECTION PREVIEW --- */}
					<section className='px-7 py-10 space-y-8 bg-zinc-50/50 dark:bg-zinc-950'>
						<div className='space-y-3'>
							<h2 className='text-lg font-black dark:text-zinc-100 tracking-tighter'>
								THE HYBRID APPROACH
							</h2>
							<p className='text-[11px] text-zinc-500 leading-relaxed'>
								{about?.description ||
									"Detail your professional philosophy and background here."}
							</p>
						</div>

						{/* Stats Row */}
						<div className='grid grid-cols-2 gap-3'>
							<div className='p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center'>
								<span className='block text-xl font-black text-blue-600'>
									{about?.yearsExp || "0"}
								</span>
								<span className='text-[8px] font-bold uppercase text-zinc-400'>
									Years Exp.
								</span>
							</div>
							<div className='p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center'>
								<span className='block text-xl font-black text-blue-600'>
									{about?.projectsCount || "0"}
								</span>
								<span className='text-[8px] font-bold uppercase text-zinc-400'>
									Projects
								</span>
							</div>
						</div>

						{/* Core Pillars List */}
						<div className='space-y-3 pb-10'>
							<h3 className='text-[10px] font-black text-zinc-400 uppercase tracking-widest'>
								Core Pillars
							</h3>
							{about?.corePillars?.map((pillar: any, idx: number) => {
								const Icon = ICON_MAP[pillar.icon] || Zap;
								return (
									<div
										key={idx}
										className='flex items-start gap-3 p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800'>
										<div className='h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0'>
											<Icon size={16} />
										</div>
										<div>
											<h4 className='text-[11px] font-bold dark:text-zinc-200'>
												{pillar.title || "Innovation"}
											</h4>
											<p className='text-[9px] text-zinc-500 leading-snug'>
												{pillar.description || "Briefly explain this pillar."}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				</div>

				{/* Floating Contact Dock */}
				<div className='absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] h-14 bg-zinc-900/95 dark:bg-zinc-100/95 backdrop-blur-xl rounded-2xl flex items-center justify-around px-4 border border-zinc-700/50 z-40'>
					<Github
						size={18}
						className='text-zinc-500 hover:text-white transition-colors'
					/>
					<Linkedin
						size={18}
						className='text-zinc-500 hover:text-white transition-colors'
					/>
					<div className='h-8 bg-blue-600 px-4 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-blue-500/40'>
						HIRE ME
					</div>
				</div>
			</div>
		</div>
	);
}
