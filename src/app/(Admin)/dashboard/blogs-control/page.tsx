/** @format */
import { Suspense } from "react";
import { db } from "@/lib/db";
import { BlogsDashboard } from "./blogs-contol";
import { DashboardSkeleton } from "@/components/dashboard/dash-skeleton";

export default async function BlogsControlPage() {
	return (
		<div className='p-4 md:px-8 space-y-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300'>
			<header>
				<h1 className='text-3xl font-bold text-zinc-900 dark:text-white'>
					Blogs Dashboard
				</h1>
				<p className='text-zinc-500 dark:text-zinc-400'>
					Create, edit, and curate your articles and insights.
				</p>
			</header>

			<Suspense fallback={<DashboardSkeleton />}>
				<BlogDataFetcher />
			</Suspense>
		</div>
	);
}

async function BlogDataFetcher() {
	// Fetch blogs with relations
	const blogs = await db.blog.findMany({
		include: {
			tags: true,
			_count: {
				select: { likes: true, comments: true },
			},
		},
		orderBy: { updatedAt: "desc" },
	});

	return <BlogsDashboard blogs={blogs} />;
}
