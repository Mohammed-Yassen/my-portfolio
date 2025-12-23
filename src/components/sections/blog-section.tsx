/** @format */
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { MotionViewport } from "../motion-viewport";
import { BLOG_POSTS } from "@/data/blogs";

export function BlogSection() {
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

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{BLOG_POSTS.slice(0, 3).map((post, i) => (
						<MotionViewport
							key={post.id}
							preset='fadeInUp'
							delay={i * 0.1}
							variant='card'
							hover='lift'
							className='group flex flex-col overflow-hidden bg-zinc-900/50 border-white/5'>
							<div className='relative h-56 w-full overflow-hidden'>
								<img
									src={post.image}
									alt={post.title}
									className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-110'
								/>
								<div className='absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white'>
									{post.category}
								</div>
							</div>

							<div className='p-6 flex flex-col grow'>
								<div className='flex items-center gap-4 text-xs text-muted-foreground mb-4'>
									<span className='flex items-center gap-1'>
										<Calendar size={12} /> {post.date}
									</span>
									<span className='flex items-center gap-1'>
										<Clock size={12} /> {post.readTime}
									</span>
								</div>
								<h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors'>
									{post.title}
								</h3>
								<p className='text-muted-foreground text-sm line-clamp-2 mb-6'>
									{post.excerpt}
								</p>
								<Link
									href={`/blogs/${post.slug}`}
									className='mt-auto inline-flex items-center text-sm font-bold text-white group-hover:gap-3 transition-all'>
									Read Article{" "}
									<ArrowRight size={14} className='ml-2 text-primary' />
								</Link>
							</div>
						</MotionViewport>
					))}
				</div>
			</div>
		</section>
	);
}
