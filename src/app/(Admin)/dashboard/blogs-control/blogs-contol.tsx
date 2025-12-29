/** @format */
"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FolderOpen, Pencil, Plus, Trash2 } from "lucide-react";

export function BlogsDashboard({ blogs: initialBlogs }: { blogs: any[] }) {
	const [selectedBlogs, setSelectedBlogs] = useState<any | null>(null);

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this blog?")) return;

		const res = "";
		// await deleteBlog(id);
		if (res) {
			toast.success("blog deleted");
			if (selectedBlogs?.id === id) setSelectedBlogs(null);
		} else {
			toast.error("Failed to delete");
		}
	};

	return (
		<div className='p-6 space-y-8'>
			<div className='flex items-center justify-between'>
				<Button
					size={"lg"}
					onClick={() => setSelectedBlogs(null)}
					className='gap-2'>
					<Plus className='w-4 h-4' /> New Blog
				</Button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8 '>
				{/* FORM SECTION */}
				<div className='lg:col-span-7'>
					<div className='bg-white dark:bg-zinc-900 rounded-2xl border shadow-sm p-1 '>
						<div className='p-4 border-b'>
							<h2 className='font-semibold'>
								{selectedBlogs
									? `Editing: ${selectedBlogs.title}`
									: "Create New Blog"}
							</h2>
						</div>
						{/* <BlogForm */}
						{/* key={selectedBlogs?.id || "new"}
                            initialData={selectedBlogs}
                        /> */}
					</div>
				</div>
				LIST SECTION
				<div className='lg:col-span-5 space-y-4'>
					<h2 className='font-semibold flex items-center gap-2'>
						<FolderOpen className='w-4 h-4' /> Existing Blogs (
						{initialBlogs.length})
					</h2>
					<div className='grid gap-3'>
						{initialBlogs.map((blog) => (
							<div
								key={blog.id}
								className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
									selectedBlogs?.id === blog.id
										? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
										: "bg-white dark:bg-zinc-900"
								}`}>
								<div className='overflow-hidden'>
									<p className='font-medium truncate'>{blog.title}</p>
									<p className='text-xs text-muted-foreground'>
										{blog.category}
									</p>
								</div>
								<div className='flex gap-2'>
									<Button
										size='icon'
										variant='outline'
										onClick={() => setSelectedBlogs(blog)}>
										<Pencil className='w-4 h-4 text-blue-500' />
									</Button>
									<Button
										size='icon'
										variant='outline'
										onClick={() => handleDelete(blog.id)}>
										<Trash2 className='w-4 h-4 text-destructive' />
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
