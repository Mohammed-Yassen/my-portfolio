/** @format */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
	LayoutDashboard,
	User,
	Briefcase,
	Mail,
	Settings,
	Sun,
	Moon,
	Command,
	Menu,
	ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
	{ name: "Overview", href: "/dashboard", icon: LayoutDashboard },
	{ name: "controls", href: "/dashboard/controls", icon: User },
	{ name: "Projects", href: "/dashboard/projects", icon: Briefcase },
	{ name: "Messages", href: "/dashboard/messages", icon: Mail },
	{ name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();

	useEffect(() => setMounted(true), []);
	if (!mounted) {
		return null;
	}

	const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
		<div className={cn("space-y-1.5", isMobile ? "mt-10" : "px-4 flex-1")}>
			{menuItems.map((item) => {
				const isActive = pathname === item.href;
				return (
					<Link
						key={item.name}
						href={item.href}
						className='relative block group'>
						<div
							className={cn(
								"flex items-center justify-between gap-4 p-3.5 rounded-2xl transition-all duration-300",
								isActive
									? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
									: "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200",
							)}>
							<div className='flex items-center gap-3'>
								<item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
								<span className='font-semibold text-[15px]'>{item.name}</span>
							</div>

							{isActive && (
								<motion.div layoutId='arrow'>
									<ArrowUpRight size={14} className='opacity-50' />
								</motion.div>
							)}
						</div>
					</Link>
				);
			})}
		</div>
	);

	return (
		<>
			{/* --- MODERN MOBILE HEADER --- */}
			<div className='lg:hidden flex items-center justify-between p-5 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-40 border-b border-zinc-200/50 dark:border-zinc-800/50'>
				<div className='flex items-center gap-3'>
					<div className='h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-xl'>
						<Command size={22} />
					</div>
					<span className='font-bold tracking-tight dark:text-white text-lg'>
						Admin
					</span>
				</div>

				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='rounded-xl border-zinc-200 dark:border-zinc-800 bg-transparent'>
							<Menu size={20} />
						</Button>
					</SheetTrigger>
					<SheetContent
						side='left'
						className='w-84 dark:bg-zinc-950 border-r-zinc-200 dark:border-r-zinc-800 p-0'>
						<div className='p-6'>
							<SheetTitle className='flex items-center gap-3 text-2xl font-black italic tracking-tighter'>
								<Command className='text-blue-600' />
								CORE
							</SheetTitle>
							<NavLinks isMobile />
							<div className='p-4 absolute  bottom-0 left-0 right-0'>
								<div className='bg-linear-to-tr from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-5 rounded-4xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 shadow-sm'>
									<div className='flex items-center justify-between'>
										<span className='text-xs font-bold text-zinc-400 uppercase tracking-wider'>
											Mode
										</span>
										{mounted && (
											<button
												onClick={() =>
													setTheme(theme === "dark" ? "light" : "dark")
												}
												className='h-8 w-14 bg-zinc-200 dark:bg-zinc-800 rounded-full relative p-1 transition-colors'>
												<motion.div
													animate={{ x: theme === "dark" ? 24 : 0 }}
													className='h-6 w-6 bg-white dark:bg-blue-600 rounded-full shadow-sm flex items-center justify-center text-zinc-900 dark:text-white'>
													{theme === "dark" ? (
														<Moon size={12} />
													) : (
														<Sun size={12} />
													)}
												</motion.div>
											</button>
										)}
									</div>
									<Button className='w-full rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity font-bold'>
										Logout
									</Button>
								</div>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>

			{/* --- MODERN DESKTOP SIDEBAR (NON-COLLAPSIBLE) --- */}
			<nav
				className={cn(
					"fixed left-3 top-3 bottom-3 z-50 hidden lg:flex flex-col w-70 rounded-[2.5rem] border transition-all duration-700",
					"bg-white/40 dark:bg-zinc-950/40 backdrop-blur-3xl border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_40px_rgba(0,0,0,0.04)]",
				)}>
				{/* Profile / Brand Section */}
				<div className='p-8'>
					<div className='flex items-center gap-4 bg-zinc-100/50 dark:bg-zinc-900/50 p-3 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50'>
						<div className='h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30'>
							<Command size={24} />
						</div>
						<div>
							<h2 className='font-bold text-sm dark:text-white leading-none'>
								Portfolio
							</h2>
							<p className='text-[11px] text-zinc-500 font-medium mt-1 uppercase tracking-widest'>
								Admin v2.0
							</p>
						</div>
					</div>
				</div>

				{/* Links */}
				<NavLinks />

				{/* Bottom Utility Card */}
				<div className='p-6'>
					<div className='bg-linear-to-tr from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 p-5 rounded-4xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 shadow-sm'>
						<div className='flex items-center justify-between'>
							<span className='text-xs font-bold text-zinc-400 uppercase tracking-wider'>
								Mode
							</span>
							{mounted && (
								<button
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
									className='h-8 w-14 bg-zinc-200 dark:bg-zinc-800 rounded-full relative p-1 transition-colors'>
									<motion.div
										animate={{ x: theme === "dark" ? 24 : 0 }}
										className='h-6 w-6 bg-white dark:bg-blue-600 rounded-full shadow-sm flex items-center justify-center text-zinc-900 dark:text-white'>
										{theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
									</motion.div>
								</button>
							)}
						</div>
						<Button className='w-full rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity font-bold'>
							Logout
						</Button>
					</div>
				</div>
			</nav>
		</>
	);
}
