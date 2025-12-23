/** @format */
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Plus, Trash2, GripVertical, ShieldCheck } from "lucide-react";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AboutSectionFields({ form }: { form: UseFormReturn<any> }) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "about.corePillars",
	});

	return (
		<div className='space-y-8'>
			{/* Narrative Card */}
			<div className='bg-white dark:bg-zinc-950 p-6 rounded-3xl border shadow-sm space-y-4'>
				<div className='flex items-center gap-2 mb-2'>
					<ShieldCheck className='text-blue-600' size={20} />
					<h3 className='font-bold uppercase tracking-tighter'>
						Professional Narrative
					</h3>
				</div>

				<FormField
					control={form.control}
					name='about.description'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-zinc-400 text-[10px] uppercase font-black'>
								Bio Statement
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className='min-h-[120px] rounded-xl'
									placeholder='Describe your hybrid approach...'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='grid grid-cols-2 gap-4'>
					{["yearsExp", "projectsCount"].map((key) => (
						<FormField
							key={key}
							control={form.control}
							name={`about.${key}`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-zinc-400 text-[10px] uppercase font-black'>
										{key.replace(/([A-Z])/g, " $1")}
									</FormLabel>
									<FormControl>
										<Input {...field} type='number' className='rounded-xl' />
									</FormControl>
								</FormItem>
							)}
						/>
					))}
				</div>
			</div>

			{/* Dynamic Pillars */}
			<div className='space-y-4'>
				<div className='flex justify-between items-end'>
					<div>
						<h3 className='font-bold text-lg leading-tight tracking-tighter uppercase'>
							Core Pillars
						</h3>
						<p className='text-xs text-zinc-500 italic'>
							Key strengths displayed on your mobile profile
						</p>
					</div>
					<button
						type='button'
						onClick={() => append({ title: "", description: "", icon: "Zap" })}
						className='flex items-center gap-2 text-[10px] font-black bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 rounded-xl active:scale-95 transition-all shadow-lg'>
						<Plus size={14} /> ADD PILLAR
					</button>
				</div>

				<div className='grid gap-4'>
					{fields.map((field, index) => (
						<div
							key={field.id}
							className='group p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 relative transition-all hover:shadow-md'>
							<button
								type='button'
								onClick={() => remove(index)}
								className='absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors'>
								<Trash2 size={16} />
							</button>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
								<Input
									{...form.register(`about.corePillars.${index}.title`)}
									placeholder='Pillar Title (e.g. Scalability)'
									className='bg-transparent border-none p-0 text-base font-bold focus-visible:ring-0 placeholder:text-zinc-300'
								/>
								<Input
									{...form.register(`about.corePillars.${index}.icon`)}
									placeholder='Lucide Icon Name'
									className='bg-zinc-50 dark:bg-zinc-800 text-xs border-none h-8 rounded-lg'
								/>
							</div>
							<Textarea
								{...form.register(`about.corePillars.${index}.description`)}
								placeholder='Briefly explain your expertise in this area...'
								className='mt-3 bg-transparent border-none p-0 text-sm italic resize-none focus-visible:ring-0 text-zinc-500'
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
