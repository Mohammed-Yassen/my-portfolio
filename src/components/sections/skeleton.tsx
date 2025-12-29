/** @format */

import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
	return (
		<div className='container mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
			<div className='lg:col-span-7 space-y-8'>
				<Skeleton className='h-6 w-40 rounded-full' />
				<div className='space-y-4'>
					<Skeleton className='h-16 w-[80%]' />
					<Skeleton className='h-10 w-[60%]' />
					<Skeleton className='h-20 w-full' />
				</div>
				<div className='flex gap-4'>
					<Skeleton className='h-12 w-32 rounded-full' />
					<Skeleton className='h-12 w-32 rounded-full' />
				</div>
			</div>
			<div className='lg:col-span-5 flex justify-center'>
				<Skeleton className='h-64 w-64 md:h-80 md:w-80 rounded-full' />
			</div>
		</div>
	);
}

export const AboutSkeleton = () => {
	return (
		<section className='py-24 bg-muted/20'>
			<div className='container mx-auto px-6'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
					{/* Left Column: Text Content Skeleton */}
					<div className='space-y-6'>
						<div className='space-y-3'>
							<Skeleton className='h-10 w-3/4' /> {/* Title Line 1 */}
							<Skeleton className='h-10 w-1/2' /> {/* Title Line 2 */}
						</div>

						<div className='space-y-2'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-2/3' />
						</div>

						<div className='space-y-2 pt-4'>
							<Skeleton className='h-4 w-full' />
							<Skeleton className='h-4 w-5/6' />
						</div>

						{/* Stats Skeleton */}
						<div className='grid grid-cols-2 gap-6 pt-8'>
							<div className='border-l-2 border-muted pl-4 space-y-2'>
								<Skeleton className='h-8 w-12' />
								<Skeleton className='h-4 w-16' />
							</div>
							<div className='border-l-2 border-muted pl-4 space-y-2'>
								<Skeleton className='h-8 w-12' />
								<Skeleton className='h-4 w-16' />
							</div>
						</div>
					</div>

					{/* Right Column: Core Pillars Skeleton */}
					<div className='space-y-4'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='p-6 rounded-2xl border bg-card flex gap-4'>
								{/* Icon Skeleton */}
								<Skeleton className='h-12 w-12 rounded-xl shrink-0' />

								{/* Text Skeleton */}
								<div className='space-y-2 w-full'>
									<Skeleton className='h-6 w-32' />
									<Skeleton className='h-4 w-full' />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export const SkillsSkeleton = () => {
	return (
		<section className='py-24 bg-background'>
			<div className='container mx-auto px-6 md:px-12'>
				{/* Header Skeleton */}
				<div className='text-center max-w-2xl mx-auto mb-16 space-y-4'>
					<Skeleton className='h-10 w-64 mx-auto' />
					<Skeleton className='h-4 w-full max-w-md mx-auto' />
				</div>

				{/* Grid Skeleton */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Generate 4 skeleton cards */}
					{[...Array(4)].map((_, i) => (
						<div key={i} className='p-6 rounded-2xl border bg-card/50'>
							<div className='flex items-center gap-3 mb-6'>
								{/* Icon Circle */}
								<Skeleton className='h-10 w-10 rounded-lg' />
								{/* Category Title */}
								<Skeleton className='h-6 w-24' />
							</div>

							{/* Skill List Skeletons */}
							<div className='space-y-4'>
								{[...Array(5)].map((_, j) => (
									<div key={j} className='flex items-center'>
										<Skeleton className='h-1.5 w-1.5 rounded-full mr-3' />
										<Skeleton className='h-4 w-full' />
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export function ProjectsSkeleton() {
	return (
		<section className='py-24 bg-background relative overflow-hidden'>
			<div className='absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none' />

			<div className='container mx-auto px-6 md:px-12'>
				{/* Header Skeleton */}
				<div className='flex flex-col md:flex-row justify-between items-center mb-16 gap-6'>
					<div className='space-y-3 w-full md:w-auto'>
						<Skeleton className='h-10 w-64 mx-auto md:mx-0' />
						<Skeleton className='h-6 w-full max-w-xl mx-auto md:mx-0' />
					</div>
					<Skeleton className='h-10 w-32 rounded-full' />
				</div>

				{/* Grid Skeleton */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className='bg-card border rounded-3xl overflow-hidden flex flex-col h-[500px]'>
							{/* Image Section */}
							<Skeleton className='h-56 w-full rounded-none' />

							{/* Content Section */}
							<div className='p-6 space-y-4 grow flex flex-col'>
								<div className='flex items-center gap-2'>
									<Skeleton className='h-8 w-8 rounded-lg' />
									<Skeleton className='h-4 w-20' />
								</div>
								<Skeleton className='h-7 w-3/4' />
								<div className='space-y-2'>
									<Skeleton className='h-4 w-full' />
									<Skeleton className='h-4 w-5/6' />
								</div>
								{/* Tech Stack */}
								<div className='flex flex-wrap gap-1.5 py-2'>
									<Skeleton className='h-5 w-12' />
									<Skeleton className='h-5 w-16' />
									<Skeleton className='h-5 w-14' />
								</div>
								{/* Footer Actions */}
								<div className='pt-4 flex items-center gap-3 border-t mt-auto'>
									<Skeleton className='h-9 flex-1 rounded-xl' />
									<Skeleton className='h-9 w-9 rounded-xl' />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
