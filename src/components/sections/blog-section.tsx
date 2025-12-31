/** @format */
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { MotionViewport } from "../motion-viewport";
import { BlogCard } from "../blog-card";

export function BlogSection({ blogs }: { blogs: any[] }) {
	return (
		<section className='py-24 bg-background'>
			<div className='container mx-auto px-6 max-w-7xl'>
				<div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-4'>
					<MotionViewport preset='fadeInLeft'>
						<h2 className='text-4xl md:text-5xl font-bold tracking-tighter'>
							Latest <span className='text-primary italic'>Insights</span>
						</h2>
					</MotionViewport>
					<Link
						href='/blogs'
						className='text-primary hover:underline flex items-center gap-2 font-medium'>
						View all articles <ArrowRight size={16} />
					</Link>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
					{blogs.map((post, i) => (
						<BlogCard key={post.id} post={post} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
