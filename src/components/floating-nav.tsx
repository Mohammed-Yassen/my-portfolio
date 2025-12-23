/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
	Home,
	User,
	Code,
	Briefcase,
	Mail,
	Sun,
	Moon,
	Terminal,
	Settings,
	MoreHorizontal,
	MessageSquare,
	Award,
	BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const primaryItems = [
	{ name: "Home", href: "#hero", icon: <Home className='w-5 h-5' /> },
	{ name: "About", href: "#about", icon: <User className='w-5 h-5' /> },
	{ name: "Skills", href: "#skills", icon: <Terminal className='w-5 h-5' /> },
	{ name: "Projects", href: "#projects", icon: <Code className='w-5 h-5' /> },
	{ name: "Contact", href: "#contact", icon: <Mail className='w-5 h-5' /> },
];

const secondaryItems = [
	{
		name: "Services",
		href: "#services",
		icon: <Settings className='w-4 h-4' />,
	},
	{
		name: "Testimonials",
		href: "#testimonials",
		icon: <MessageSquare className='w-4 h-4' />,
	},
	{
		name: "Certifications",
		href: "#certifications",
		icon: <Award className='w-4 h-4' />,
	},
	{ name: "Blog", href: "#blog", icon: <BookOpen className='w-4 h-4' /> },
];

export const FloatingDock = () => {
	const [mounted, setMounted] = useState(false);
	const [showMore, setShowMore] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	const handleScroll = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		const targetId = href.replace("#", "");
		const elem = document.getElementById(targetId);
		elem?.scrollIntoView({ behavior: "smooth" });
		setShowMore(false); // Close menu after click
	};

	if (!mounted) return null;

	return (
		<div className='fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none'>
			<div className='relative flex flex-col items-center'>
				{/* Vertical Secondary Menu */}
				<AnimatePresence>
					{showMore && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.95 }}
							animate={{ opacity: 1, y: -10, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.95 }}
							className='absolute bottom-full mb-2 flex flex-col gap-2 p-2 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-2xl pointer-events-auto'>
							{secondaryItems.map((item) => (
								<a
									key={item.name}
									href={item.href}
									onClick={(e) => handleScroll(e, item.href)}
									className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all group'>
									{item.icon}
									<span className='font-medium'>{item.name}</span>
								</a>
							))}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Main Horizontal Dock */}
				<nav className='flex items-center gap-1 p-2 rounded-2xl bg-background/60 backdrop-blur-xl border border-border shadow-2xl pointer-events-auto'>
					<TooltipProvider delayDuration={0}>
						{primaryItems.map((item) => (
							<Tooltip key={item.name}>
								<TooltipTrigger asChild>
									<a
										href={item.href}
										onClick={(e) => handleScroll(e, item.href)}
										className='p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:-translate-y-1.5 active:scale-95'>
										{item.icon}
									</a>
								</TooltipTrigger>
								<TooltipContent
									side='top'
									className='bg-primary text-primary-foreground font-bold mb-2'>
									{item.name}
								</TooltipContent>
							</Tooltip>
						))}

						{/* Toggle Secondary Menu */}
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={() => setShowMore(!showMore)}
									className={`p-3 rounded-xl transition-all duration-300 ${
										showMore
											? "bg-primary text-primary-foreground rotate-90"
											: "text-muted-foreground hover:bg-primary/10"
									}`}>
									<MoreHorizontal className='w-5 h-5' />
								</button>
							</TooltipTrigger>
							<TooltipContent
								side='top'
								className='bg-primary text-primary-foreground font-bold mb-2'>
								More
							</TooltipContent>
						</Tooltip>

						<div className='w-px h-6 bg-border mx-2' />

						<Button
							variant='ghost'
							size='icon'
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							className='rounded-xl hover:bg-primary/10 transition-transform active:rotate-45'>
							{theme === "dark" ? (
								<Sun className='w-5 h-5' />
							) : (
								<Moon className='w-5 h-5' />
							)}
						</Button>
					</TooltipProvider>
				</nav>
			</div>
		</div>
	);
};
