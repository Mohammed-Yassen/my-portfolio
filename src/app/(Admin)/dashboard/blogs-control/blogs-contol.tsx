/** @format */
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
	FileText,
	Pencil,
	Plus,
	Trash2,
	Search,
	Eye,
	ExternalLink,
	Clock,
	X,
} from "lucide-react";
import { deleteBlogAction } from "@/app/actions/blogs-actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogForm } from "@/app/(Admin)/dashboard/blogs-control/blog-form";

export function BlogsDashboard({ blogs }: { blogs: any[] }) {
	const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredBlogs = blogs.filter((b) =>
		b.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this post permanently?")) return;
		const res = await deleteBlogAction(id);
		if (res.success) {
			toast.success("Blog deleted successfully");
			if (selectedBlog?.id === id) setSelectedBlog(null);
		}
	};

	return (
		<div className='max-w-7xl mx-auto p-4 md:p-6 space-y-6'>
			{/* Header Area */}
			<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Content Manager</h1>
					<p className='text-muted-foreground'>
						Create, edit, and manage your blog posts.
					</p>
				</div>
				<Button
					size='lg'
					onClick={() => {
						setIsCreating(true);
						setSelectedBlog(null);
					}}
					className='shadow-lg hover:shadow-primary/20 transition-all'>
					<Plus className='w-5 h-5 mr-2' /> New Article
				</Button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				{/* Left: Blog List */}
				<div className='lg:col-span-5 space-y-4'>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
						<Input
							placeholder='Search articles...'
							className='pl-10'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className='space-y-3'>
						{filteredBlogs.map((blog) => (
							<Card
								key={blog.id}
								onClick={() => {
									setSelectedBlog(blog);
									setIsCreating(false);
								}}
								className={`group p-4 cursor-pointer transition-all border-2 hover:border-primary/40 ${
									selectedBlog?.id === blog.id
										? "border-primary bg-primary/5 shadow-md"
										: "border-transparent bg-white dark:bg-zinc-900"
								}`}>
								<div className='flex justify-between items-start gap-4'>
									<div className='space-y-1 overflow-hidden'>
										<div className='flex items-center gap-2'>
											<Badge
												variant={blog.isPublished ? "default" : "secondary"}
												className='text-[10px] px-1.5 py-0'>
												{blog.isPublished ? "Live" : "Draft"}
											</Badge>
											<span className='text-xs text-muted-foreground flex items-center gap-1'>
												<Clock className='w-3 h-3' /> {blog.readTime}
											</span>
										</div>
										<h3 className='font-bold truncate group-hover:text-primary transition-colors'>
											{blog.title}
										</h3>
										<p className='text-xs text-muted-foreground line-clamp-1'>
											{blog.excerpt}
										</p>
									</div>
									<div className='flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
										<Button
											size='icon'
											variant='ghost'
											className='h-8 w-8 text-destructive'
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(blog.id);
											}}>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>

				{/* Right: Form Area */}
				<div className='lg:col-span-7'>
					{isCreating || selectedBlog ? (
						<Card className='border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden'>
							<div className='p-4 border-b flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/20'>
								<h2 className='font-bold flex items-center gap-2'>
									{isCreating ? (
										<Plus className='w-5 h-5 text-primary' />
									) : (
										<Pencil className='w-5 h-5 text-primary' />
									)}
									{isCreating ? "Draft New Post" : "Edit Post"}
								</h2>
								<Button
									variant='ghost'
									size='icon'
									onClick={() => {
										setIsCreating(false);
										setSelectedBlog(null);
									}}>
									<X className='w-4 h-4' />
								</Button>
							</div>
							<BlogForm
								key={selectedBlog?.id || "new"}
								initialData={selectedBlog}
								onSuccess={() => {
									setIsCreating(false);
									setSelectedBlog(null);
								}}
							/>
						</Card>
					) : (
						<div className='h-100 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl text-muted-foreground space-y-4'>
							<div className='p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full'>
								<FileText className='w-10 h-10' />
							</div>
							<p className='font-medium'>
								Select an article to edit or create a new one
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
