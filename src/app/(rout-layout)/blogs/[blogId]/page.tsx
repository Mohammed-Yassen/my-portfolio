/** @format */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Share2, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BLOG_POSTS } from "@/data/blogs";
import { MotionViewport } from "@/components/motion-viewport";

export default function BlogDetailPage() {
	const params = useParams();
	const { scrollYProgress } = useScroll();

	// Create a smooth progress bar spring
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		// restDelta: 001,
	});

	// Find the post by slug or ID
	const post = BLOG_POSTS.find(
		(p) => p.slug === params.blogId || p.id.toString() === params.blogId,
	);

	if (!post) {
		return (
			<div className='h-screen flex flex-col items-center justify-center'>
				<h1 className='text-2xl font-bold'>Article not found</h1>
				<Link href='/blogs' className='text-primary mt-4 underline'>
					Return to all blogs
				</Link>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-background pb-24'>
			{/* Scroll Progress Bar */}
			<motion.div
				className='fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50'
				style={{ scaleX }}
			/>

			{/* Navigation Header */}
			<nav className='fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5 py-4'>
				<div className='container mx-auto px-6 max-w-7xl flex justify-between items-center'>
					<Link
						href='/blogs'
						className='flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group'>
						<ArrowLeft
							size={16}
							className='group-hover:-translate-x-1 transition-transform'
						/>
						Back to Feed
					</Link>
					<div className='flex items-center gap-4'>
						<button className='p-2 hover:bg-secondary rounded-full transition-colors'>
							<Share2 size={18} />
						</button>
					</div>
				</div>
			</nav>

			<article className='pt-32'>
				{/* Hero Header */}
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
								<Calendar size={14} /> {post.date}
							</span>
							<span className='flex items-center gap-1.5'>
								<Clock size={14} /> {post.readTime} reading time
							</span>
						</div>
					</MotionViewport>
				</header>

				{/* Featured Image */}
				<div className='container mx-auto px-6 max-w-6xl mb-20'>
					<MotionViewport
						preset='scaleUp'
						className='aspect-video relative rounded-3xl overflow-hidden shadow-2xl border border-white/10'>
						<img
							src={post.image}
							alt={post.title}
							className='w-full h-full object-cover'
						/>
					</MotionViewport>
				</div>

				{/* Article Body */}
				<div className='container mx-auto px-6 max-w-3xl'>
					<div className='prose prose-zinc prose-invert max-w-none'>
						{/* Introduction */}
						<p className='text-xl leading-relaxed text-zinc-300 font-medium mb-12'>
							{post.excerpt}
						</p>

						<h2 className='text-3xl font-bold text-white mt-16 mb-6'>
							Building the Future
						</h2>
						<p className='text-zinc-400 leading-loose mb-8'>
							In the modern era of web development, the boundary between design
							and engineering is blurring. By leveraging tools like{" "}
							<span className='text-primary'>Next.js 15</span> and{" "}
							<span className='text-primary'>Framer Motion</span>, we can create
							experiences that aren't just functional, but emotional.
						</p>

						{/* Code Block Design */}
						<div className='my-12 p-6 rounded-2xl bg-zinc-900 border border-white/5 font-mono text-sm shadow-inner'>
							<div className='flex gap-1.5 mb-4'>
								<div className='w-3 h-3 rounded-full bg-red-500/20' />
								<div className='w-3 h-3 rounded-full bg-yellow-500/20' />
								<div className='w-3 h-3 rounded-full bg-green-500/20' />
							</div>
							<code className='text-primary'>
								{`const BlogId = "${params.blogId}";`} <br />
								{`console.log("Viewing article:", BlogId);`}
							</code>
						</div>

						<p className='text-zinc-400 leading-loose'>
							To conclude, the journey of building a technical blog is about
							more than sharing information—it's about building a digital
							legacy.
						</p>
					</div>

					{/* Author Footer */}
					<footer className='mt-20 pt-10 border-t border-white/5'>
						<div className='bg-zinc-900/50 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left'>
							<img
								src='https://github.com/shadcn.png'
								className='w-20 h-20 rounded-2xl border border-primary/20 shadow-xl'
								alt='Author'
							/>
							<div>
								<h4 className='text-lg font-bold'>Written by Your Name</h4>
								<p className='text-sm text-muted-foreground max-w-md mt-1'>
									Software Architect and Creative Developer focusing on
									high-performance web experiences.
								</p>
							</div>
							<button className='md:ml-auto px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all'>
								Follow
							</button>
						</div>
					</footer>
				</div>
			</article>
		</div>
	);
}
