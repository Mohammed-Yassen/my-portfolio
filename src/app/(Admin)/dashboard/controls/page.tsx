/** @format */
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	LayoutDashboard,
	User,
	Wrench,
	Briefcase,
	GraduationCap,
	Award,
	Settings2,
} from "lucide-react";

import {
	SkillManagerSkeleton,
	GenericSectionSkeleton,
} from "@/components/dashboard/dash-skeleton";

import {
	AboutLoader,
	CertificationsLoader,
	EducationLoader,
	ExperienceLoader,
	HeroLoader,
	SkillLoader,
} from "./control-loader";

export default async function ControlPage() {
	return (
		<main className='min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300'>
			{/* --- Sticky Header --- */}
			<header className='sticky top-0 z-30 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
					<div className='flex items-center gap-2 sm:gap-3'>
						<div className='p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20'>
							<Settings2 className='text-white' size={18} />
						</div>
						<h1 className='text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
							System <span className='hidden xs:inline'>Control</span>
						</h1>
					</div>

					<div className='flex items-center gap-3'>
						<div className='hidden sm:flex flex-col items-end mr-2'>
							<p className='text-[10px] font-bold text-zinc-400 uppercase tracking-widest'>
								Status
							</p>
							<p className='text-xs font-semibold text-emerald-500'>
								Live Session
							</p>
						</div>
						<span className='flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20' />
					</div>
				</div>
			</header>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10'>
				<Tabs defaultValue='hero' className='space-y-6 sm:space-y-10'>
					{/* --- Responsive Tabs List --- */}
					{/* The 'no-scrollbar' utility combined with 'inline-flex' allows horizontal swiping on mobile */}
					<div className='relative border-b border-zinc-200 dark:border-zinc-800 pb-4'>
						<TabsList className='flex h-auto w-full justify-start overflow-x-auto bg-transparent p-0 no-scrollbar gap-2'>
							<TabTrigger value='hero' icon={LayoutDashboard} label='Hero' />
							<TabTrigger value='about' icon={User} label='About' />
							<TabTrigger value='skills' icon={Wrench} label='Skills' />
							<TabTrigger
								value='experiences'
								icon={Briefcase}
								label='Experience'
							/>
							<TabTrigger
								value='educations'
								icon={GraduationCap}
								label='Education'
							/>
							<TabTrigger value='certification' icon={Award} label='Certs' />
						</TabsList>
					</div>

					{/* --- Content Area --- */}
					<div className='mt-4 sm:mt-8'>
						<TabContent
							value='hero'
							loader={<HeroLoader />}
							skeleton={<GenericSectionSkeleton />}
						/>
						<TabContent
							value='about'
							loader={<AboutLoader />}
							skeleton={<GenericSectionSkeleton />}
						/>
						<TabContent
							value='skills'
							loader={<SkillLoader />}
							skeleton={<SkillManagerSkeleton />}
						/>
						<TabContent
							value='experiences'
							loader={<ExperienceLoader />}
							skeleton={<GenericSectionSkeleton />}
						/>
						<TabContent
							value='educations'
							loader={<EducationLoader />}
							skeleton={<GenericSectionSkeleton />}
						/>
						<TabContent
							value='certification'
							loader={<CertificationsLoader />}
							skeleton={<GenericSectionSkeleton />}
						/>
					</div>
				</Tabs>
			</div>
		</main>
	);
}

/**
 * TabTrigger: Optimized for mobile 'Thumb' interaction
 */
function TabTrigger({
	value,
	icon: Icon,
	label,
}: {
	value: string;
	icon: any;
	label: string;
}) {
	return (
		<TabsTrigger
			value={value}
			className='flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-transparent
                       text-zinc-500 transition-all duration-200 whitespace-nowrap
                       data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 
                       data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400
                       data-[state=active]:border-zinc-200 dark:data-[state=active]:border-zinc-800
                       data-[state=active]:shadow-xl data-[state=active]:shadow-zinc-200/50 dark:data-[state=active]:shadow-none
                       hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'>
			<Icon size={16} className='shrink-0' />
			<span className='text-sm font-bold tracking-tight'>{label}</span>
		</TabsTrigger>
	);
}

/**
 * TabContent: Responsive Padding and Radius
 */
function TabContent({
	value,
	loader,
	skeleton,
}: {
	value: string;
	loader: React.ReactNode;
	skeleton: React.ReactNode;
}) {
	return (
		<TabsContent
			value={value}
			className='focus-visible:outline-none ring-offset-background animate-in fade-in slide-in-from-bottom-2 duration-300'>
			<div
				className='bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 
                            rounded-[1.5rem] sm:rounded-[2.5rem] 
                            p-4 sm:p-8 lg:p-12
                            shadow-2xl shadow-zinc-200/40 dark:shadow-none'>
				<Suspense fallback={skeleton}>{loader}</Suspense>
			</div>
		</TabsContent>
	);
}
