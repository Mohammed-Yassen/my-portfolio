/** @format */
import { getBlogs } from "@/app/data/blogs";
import { BlogCard } from "@/components/blog-card";
import { MotionViewport } from "@/components/motion-viewport";

export default async function BlogPage() {
	const posts = await getBlogs();

	return (
		<main className='min-h-screen pt-32 pb-24 bg-background'>
			<div className='container mx-auto px-6 max-w-7xl'>
				<header className='max-w-3xl mb-20'>
					<MotionViewport preset='fadeInUp'>
						<h1 className='text-5xl md:text-7xl font-bold tracking-tighter mb-6'>
							Engineering <span className='text-primary italic'>&</span>{" "}
							Insights
						</h1>
						<p className='text-xl text-muted-foreground leading-relaxed'>
							In-depth articles about cloud architecture and the future of web
							development.
						</p>
					</MotionViewport>
				</header>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
					{posts.map((post, i) => (
						<BlogCard key={post.id} post={post} index={i} />
					))}
				</div>
			</div>
		</main>
	);
}
