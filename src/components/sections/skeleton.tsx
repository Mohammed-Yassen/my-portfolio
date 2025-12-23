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
