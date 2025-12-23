/** @format */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Code2, ArrowRight } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Services", href: "#services" },
	{ name: "Experience", href: "#experience" },
];

export const Navbar = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const [isScrolled, setIsScrolled] = useState(false);

	// Avoid Hydration Mismatch
	useEffect(() => {
		setMounted(true);
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!mounted) return null;

	return (
		<header
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background/80 backdrop-blur-md border-b py-3"
					: "bg-transparent py-5"
			}`}>
			<div className='container mx-auto px-6 md:px-12 flex items-center justify-between'>
				{/* Logo */}
				<Link href='/' className='flex items-center gap-2 group'>
					<div className='bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform'>
						<Code2 className='w-6 h-6 text-primary-foreground' />
					</div>
					<span className='text-xl font-bold tracking-tighter'>
						AMJD<span className='text-primary'>.</span>LAB
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className='hidden md:flex items-center gap-8'>
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'>
							{link.name}
						</Link>
					))}
				</nav>

				{/* Actions (Theme + CTA) */}
				<div className='hidden md:flex items-center gap-4'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className='rounded-full'>
						{theme === "dark" ? (
							<Sun className='w-5 h-5' />
						) : (
							<Moon className='w-5 h-5' />
						)}
					</Button>

					<Button asChild size='sm' className='rounded-full px-6 group'>
						<Link href='#contact'>
							Hire Me
							<ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
						</Link>
					</Button>
				</div>

				{/* Mobile Navigation (Sheet) */}
				<div className='md:hidden flex items-center gap-4  '>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className='rounded-full'>
						{theme === "dark" ? (
							<Sun className='w-5 h-5' />
						) : (
							<Moon className='w-5 h-5' />
						)}
					</Button>

					<Sheet>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon'>
								<Menu className='w-6 h-6' />
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-75 sm:w-100 '>
							<SheetHeader className='text-left'>
								<SheetTitle className='flex items-center gap-2'>
									<Code2 className='w-5 h-5 text-primary' />
									Menu
								</SheetTitle>
							</SheetHeader>
							<div className='flex flex-col gap-6 mt-12 v '>
								{navLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className='text-xl font-semibold mx-auto hover:text-primary transition-colors'>
										{link.name}
									</Link>
								))}
								<hr className='border-muted ' />
								<Button
									asChild
									className='w-full rounded-xl py-6 absolute bottom-3.5 text-lg'>
									<Link href='#contact'>Start a Project</Link>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};
