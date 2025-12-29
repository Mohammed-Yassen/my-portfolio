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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const SkillManagerSkeleton = () => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse'>
			{/* --- LEFT SIDE: FORM CARD SKELETON --- */}
			<div className='lg:col-span-5 space-y-4'>
				<Card className='border-2 border-dashed border-muted'>
					<CardHeader>
						<Skeleton className='h-6 w-40 mb-2' />
						<Skeleton className='h-4 w-60' />
					</CardHeader>
					<CardContent className='space-y-6'>
						{/* Inputs */}
						<div className='space-y-4'>
							<div className='space-y-2'>
								<Skeleton className='h-4 w-28' />
								<Skeleton className='h-10 w-full' />
							</div>
							<div className='space-y-2'>
								<Skeleton className='h-4 w-16' />
								<Skeleton className='h-10 w-full' />
							</div>
						</div>

						<Separator />

						{/* Skills List Area */}
						<div className='space-y-3'>
							<div className='flex justify-between items-center'>
								<Skeleton className='h-4 w-20' />
								<Skeleton className='h-8 w-16' />
							</div>
							{/* Nested Skill Items */}
							<div className='space-y-2'>
								{[1, 2].map((i) => (
									<div key={i} className='p-3 border rounded-md space-y-3'>
										<Skeleton className='h-8 w-full' />
										<Skeleton className='h-2 w-full mt-4' />
									</div>
								))}
							</div>
						</div>

						{/* Button */}
						<Skeleton className='h-10 w-full mt-4' />
					</CardContent>
				</Card>
			</div>

			{/* --- RIGHT SIDE: DATA LIST SKELETON --- */}
			<div className='lg:col-span-7 space-y-4'>
				<div className='grid grid-cols-1 gap-3'>
					{[1, 2, 3, 4].map((i) => (
						<Card key={i} className='p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-4'>
									{/* Icon Square */}
									<Skeleton className='h-10 w-10 rounded-lg' />
									<div className='space-y-2'>
										{/* Title */}
										<Skeleton className='h-4 w-32' />
										{/* Badges */}
										<div className='flex gap-1'>
											<Skeleton className='h-4 w-12 rounded-full' />
											<Skeleton className='h-4 w-16 rounded-full' />
											<Skeleton className='h-4 w-10 rounded-full' />
										</div>
									</div>
								</div>
								{/* Action Buttons */}
								<div className='flex gap-1'>
									<Skeleton className='h-8 w-8 rounded-md' />
									<Skeleton className='h-8 w-8 rounded-md' />
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};
