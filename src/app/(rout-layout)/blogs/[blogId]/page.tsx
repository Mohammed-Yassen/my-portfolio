/** @format */
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { MotionViewport } from "@/components/motion-viewport";
import { getBlogById } from "@/app/data/blogs";
import ReadingProgress from "@/components/reading-progress";

export default async function BlogDetailPage({
	params,
}: {
	params: Promise<{ blogId: string }>;
}) {
	// 1. Unwrap the params promise
	const { blogId } = await params;
	const post = await getBlogById(blogId);

	if (!post) notFound();

	const readTime = Math.ceil(post.content.length / 1000) || 1;

	return (
		<div className='min-h-screen bg-background pb-24'>
			<ReadingProgress />

			<nav className='fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border py-4'>
				<div className='container mx-auto px-6 max-w-7xl flex justify-between items-center'>
					<Link
						href='/blogs'
						className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary group'>
						<ArrowLeft
							size={16}
							className='group-hover:-translate-x-1 transition-transform'
						/>
						Back to Feed
					</Link>
					<button className='p-2 hover:bg-muted rounded-full transition-colors'>
						<Share2 size={18} />
					</button>
				</div>
			</nav>

			<article className='pt-32'>
				<header className='container mx-auto px-6 max-w-4xl text-center mb-16'>
					<MotionViewport preset='fadeInUp'>
						<span className='text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block'>
							{post.category}
						</span>
						<h1 className='text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]'>
							{post.title}
						</h1>
						<div className='flex items-center justify-center gap-6 text-sm text-muted-foreground'>
							<span className='flex items-center gap-1.5'>
								<Calendar size={14} />{" "}
								{post.publishedAt
									? format(new Date(post.publishedAt), "MMMM dd, yyyy")
									: "Draft"}
							</span>
							<span className='flex items-center gap-1.5'>
								<Clock size={14} /> {readTime} min read
							</span>
						</div>
					</MotionViewport>
				</header>

				<div className='container mx-auto px-6 max-w-5xl mb-20'>
					<MotionViewport
						preset='scaleUp'
						className='aspect-video relative rounded-3xl overflow-hidden shadow-2xl border'>
						<img
							src={post.image || "/placeholder.jpg"}
							alt={post.title}
							className='w-full h-full object-cover'
						/>
					</MotionViewport>
				</div>

				<div className='container mx-auto px-6 max-w-3xl'>
					<div
						className='prose prose-zinc dark:prose-invert max-w-none prose-headings:tracking-tighter prose-p:leading-loose'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</div>
			</article>
		</div>
	);
}
