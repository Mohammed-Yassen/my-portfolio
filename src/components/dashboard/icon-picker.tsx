/** @format */

"use client";

import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// export const ICON_OPTIONS = [
// 	{ label: "Frontend", value: "Layout", icon: Layout },

// 	{ label: "Backend", value: "Server", icon: Server },

// 	{ label: "Database", value: "Database", icon: Database },

// 	{ label: "Mobile", value: "Smartphone", icon: Smartphone },

// 	{ label: "Web", value: "Globe", icon: Globe },

// 	{ label: "Logic/Code", value: "Code2", icon: Code2 },

// 	{ label: "DevOps", value: "Cloud", icon: Cloud },

// 	{ label: "Architecture", value: "Layers", icon: Layers },

// 	{ label: "Security", value: "ShieldCheck", icon: ShieldCheck },

// 	{ label: "System/Hardware", value: "Cpu", icon: Cpu },

// 	{ label: "Terminal", value: "Terminal", icon: Terminal },

// 	{ label: "Design", value: "Palette", icon: Palette },
// ] as const;
export function IconPicker({
	value,
	onChange,
}: {
	value: string;
	onChange: (val: string) => void;
}) {
	const [search, setSearch] = useState("");
	const IconNames = Object.keys(Icons).filter((name) =>
		name.toLowerCase().includes(search.toLowerCase()),
	) as Array<keyof typeof Icons>;

	const SelectedIcon = (Icons as any)[value] || Icons.HelpCircle;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='outline' className='w-full justify-between '>
					<div className='flex items-center gap-2'>
						<SelectedIcon className='h-4 w-4' />
						<span>{value || "Select Icon"}</span>
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-75 p-2  bg-white dark:bg-zinc-800 '>
				<Input
					placeholder='Search icons...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='mb-2'
				/>
				<ScrollArea className='h-50'>
					<div className='grid grid-cols-4 gap-2'>
						{IconNames.slice(0, 40).map((name) => {
							const Icon = Icons[name] as any;
							return (
								<Button
									key={name}
									variant='ghost'
									size='icon'
									onClick={() => onChange(name)}
									className={value === name ? "bg-accent" : ""}>
									<Icon className='h-4 w-4' />
								</Button>
							);
						})}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	);
}
