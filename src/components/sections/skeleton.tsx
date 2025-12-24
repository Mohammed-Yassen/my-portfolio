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
