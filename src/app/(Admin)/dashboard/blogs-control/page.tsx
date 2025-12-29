/** @format */
import { getPublishedProjects } from "@/app/data";

export default async function BlogsControlPage() {
	const rawProjects = await getPublishedProjects();

	// Transform DB data to Form-friendly data

	return (
		<div className='p-4 md:px-8 space-y-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300'>
			<header>
				<h1 className='text-3xl font-bold text-zinc-900 dark:text-white'>
					Projects Dashboard
				</h1>
				<p className='text-zinc-500 dark:text-zinc-400'>
					Create, edit, and curate your portfolio works.
				</p>
			</header>

			<div className='grid grid-cols-1  '>
				<div className=''>
					{/* <ProjectsDashboard projects={rawProjects} />{" "} */}
				</div>
			</div>
		</div>
	);
}
