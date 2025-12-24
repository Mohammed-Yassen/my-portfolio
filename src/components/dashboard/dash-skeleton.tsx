/** @format */
import { Skeleton } from "@/components/ui/skeleton";

export function IdentitySkeleton() {
	return (
		<div className='space-y-6 animate-pulse'>
			<div className='h-14 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl' />
			<div className='p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] space-y-6'>
				<Skeleton className='h-8 w-1/3' />
				<div className='grid grid-cols-2 gap-4'>
					<Skeleton className='h-12 w-full' />
					<Skeleton className='h-12 w-full' />
				</div>
				<Skeleton className='h-32 w-full' />
			</div>
		</div>
	);
}
export function HeroSkeleton() {
	return (
		<div className='space-y-6 animate-pulse'>
			<div className='h-14 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl' />
			<div className='p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] space-y-6'>
				<Skeleton className='h-8 w-1/3' />
				<div className='grid grid-cols-2 gap-4'>
					<Skeleton className='h-12 w-full' />
					<Skeleton className='h-12 w-full' />
				</div>
				<Skeleton className='h-32 w-full' />
			</div>
		</div>
	);
}
export function AboutSkeleton() {
	return (
		<div className='space-y-6 animate-pulse'>
			<div className='h-14 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl' />
			<div className='p-8 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] space-y-6'>
				<Skeleton className='h-8 w-1/3' />
				<div className='grid grid-cols-2 gap-4'>
					<Skeleton className='h-12 w-full' />
					<Skeleton className='h-12 w-full' />
				</div>
				<Skeleton className='h-32 w-full' />
			</div>
		</div>
	);
}
