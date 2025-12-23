/** @format */

/** @format */
import { MotionViewport } from "@/components/motion-viewport";
import { BLOG_POSTS } from "@/data/blogs";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
	return (
		<main className='min-h-screen pt-32 pb-24 bg-background'>
			<div className='container mx-auto px-6 max-w-7xl'>
				{/* Page Header */}
				<header className='max-w-3xl mb-20'>
					<MotionViewport preset='fadeInUp'>
						<h1 className='text-5xl md:text-7xl font-bold tracking-tighter mb-6'>
							Engineering <span className='text-primary italic'>&</span>{" "}
							Insights
						</h1>
						<p className='text-xl text-muted-foreground leading-relaxed'>
							In-depth articles about cloud architecture, security, and the
							future of web development.
						</p>
					</MotionViewport>
				</header>

				{/* The Feed */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
					{BLOG_POSTS.map((post, i) => (
						<MotionViewport
							key={post.id}
							preset='fadeInUp'
							delay={i * 0.1}
							className='group flex flex-col'>
							<Link
								href={`/blogs/${post.slug}`}
								className='relative h-64 mb-6 overflow-hidden rounded-2xl block'>
								<img
									src={post.image}
									alt={post.title}
									className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
								/>
								<div className='absolute top-4 left-4'>
									<span className='bg-black/50 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/10'>
										{post.category}
									</span>
								</div>
							</Link>

							<div className='flex items-center gap-4 text-xs text-muted-foreground mb-4 font-mono'>
								<span className='flex items-center gap-1'>
									<Calendar size={14} /> {post.date}
								</span>
								<span className='flex items-center gap-1'>
									<Clock size={14} /> {post.readTime} read
								</span>
							</div>

							<h2 className='text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight'>
								<Link href={`/blogs/${post.slug}`}>{post.title}</Link>
							</h2>

							<p className='text-muted-foreground line-clamp-3 mb-6 grow text-sm'>
								{post.excerpt}
							</p>

							<Link
								href={`/blogs/${post.slug}`}
								className='inline-flex items-center gap-2 font-bold text-sm hover:text-primary transition-all group/link'>
								Continue Reading
								<ArrowRight
									size={16}
									className='group-hover/link:translate-x-1 transition-transform text-primary'
								/>
							</Link>
						</MotionViewport>
					))}
				</div>
			</div>
		</main>
	);
}
