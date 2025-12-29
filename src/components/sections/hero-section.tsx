/** @format */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { HeroSection as Hero } from "@prisma/client";

interface HeroSectionProps {
	data: Hero | null;
}

// 1. Define status configurations outside for performance
const STATUS_CONFIG = {
	AVAILABLE: {
		dot: "bg-green-500",
		ping: "bg-green-400",
		wrapper: "bg-green-500/10 border-green-500/20 text-green-700",
		label: "Available for projects",
	},
	BUSY: {
		dot: "bg-orange-500",
		ping: "bg-orange-400",
		wrapper: "bg-orange-500/10 border-orange-500/20 text-orange-700",
		label: "Currently Busy",
	},
	DEFAULT: {
		dot: "bg-blue-500",
		ping: "bg-blue-400",
		wrapper: "bg-blue-500/10 border-blue-500/20 text-blue-700",
		label: "Open to Work",
	},
};

export const HeroSection = ({ data }: HeroSectionProps) => {
	const router = useRouter();

	// 2. Real-time Synchronization Listener
	useEffect(() => {
		const bc = new BroadcastChannel("portfolio_updates");
		bc.onmessage = (msg) => {
			if (msg.data === "refresh") {
				router.refresh();
			}
		};
		return () => bc.close();
	}, [router]);

	// 3. Centralized profile data with defaults
	const profile = useMemo(
		() => ({
			greeting: data?.greeting || "HI I'm",
			name: data?.name || "Mohammed Yaseen",
			role: data?.role || "Full-Stack Developer & AI Researcher",
			description:
				data?.description ||
				"I bridge the gap between academic research and scalable engineering.",
			status:
				(data?.status?.toUpperCase() as keyof typeof STATUS_CONFIG) ||
				"DEFAULT",
			image: data?.primaryImage || "/p4.png",

			resumeUrl: data?.resumeUrl,
		}),
		[data],
	);
	const handleDownload = async () => {
		if (!profile.resumeUrl) {
			console.log("none cv");
			return;
		}

		try {
			// 1. Fetch the file data
			const response = await fetch(profile.resumeUrl);
			const blob = await response.blob();

			// 2. Create a local URL for the file data
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");

			link.href = url;
			link.download = "Mohammed_Yaseen_CV.pdf"; // The name it will save as

			// 3. Trigger the download
			document.body.appendChild(link);
			link.click();

			// 4. Cleanup
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Download failed:", error);
			// Fallback: just open in new tab if fetch fails
			window.open(profile.resumeUrl, "_blank");
		}
	};

	const statusStyle = STATUS_CONFIG[profile.status] || STATUS_CONFIG.DEFAULT;
	const roles = profile.role.split("&&");
	return (
		<section
			id='hero'
			className='relative w-full min-h-screen flex items-center  overflow-hidden py-16 md:py-24'>
			{/* Background Ambient Glow */}
			<div className='absolute inset-0 pointer-events-none'>
				<motion.div
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.15, 0.25, 0.15],
					}}
					transition={{ duration: 10, repeat: Infinity }}
					className='absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-primary/30 rounded-full blur-[120px]'
				/>
			</div>

			<div className='container mx-auto px-6 z-10'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
					{/* Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className='lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1'>
						<div className='space-y-5'>
							{/* Animated Availability Badge */}
							<motion.div
								layout
								className={cn(
									"inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm transition-colors duration-500",
									statusStyle.wrapper,
								)}>
								<span className='relative flex h-2 w-2'>
									<AnimatePresence mode='popLayout'>
										<motion.span
											key={profile.status}
											initial={{ scale: 0.5, opacity: 0 }}
											animate={{ scale: 1, opacity: 0.75 }}
											className={cn(
												"animate-ping absolute inline-flex h-full w-full rounded-full",
												statusStyle.ping,
											)}
										/>
									</AnimatePresence>
									<span
										className={cn(
											"relative inline-flex rounded-full h-2 w-2 transition-colors duration-500",
											statusStyle.dot,
										)}
									/>
								</span>
								<motion.span
									layout
									className='text-xs font-bold uppercase tracking-wider'>
									{statusStyle.label}
								</motion.span>
							</motion.div>

							<h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight'>
								{profile.greeting}{" "}
								<span className='text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 capitalize'>
									{profile.name}
								</span>
							</h1>

							<motion.h2
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className='mt-6 text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground pl-5'>
								{profile.role.split("&&").join(" • ")}
							</motion.h2>

							<motion.p
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.15, duration: 0.4 }}
								className='mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed border-l-2 border-primary/30 pl-5 italic'>
								“{profile.description}”
							</motion.p>
						</div>

						{/* CTA Buttons */}
						<div className='flex flex-wrap justify-center lg:justify-start gap-4 pt-4'>
							<Button
								size='lg'
								className='rounded-full px-8 h-14 text-base shadow-xl hover:scale-105 transition-all'>
								Start a Project <ArrowRight className='ml-2 h-5 w-5' />
							</Button>

							<Button
								onClick={handleDownload}
								size='lg'
								disabled={profile.resumeUrl ? true : false}
								variant='outline'
								className={
									"rounded-full px-8 h-14 text-base shadow-xl hover:scale-105 transition-all "
								}>
								<Download className='mr-2 h-5 w-5' /> Download CV
							</Button>
						</div>

						{/* Social Links */}
						<div className='flex justify-center lg:justify-start items-center gap-6 pt-8 border-t border-border w-fit mx-auto lg:mx-0'>
							<SocialLink href={"#"} icon={<Github className='h-5 w-5' />} />
							<SocialLink href={"#"} icon={<Linkedin className='h-5 w-5' />} />
							<div className='h-6 w-px bg-border mx-2' />
							<a
								// href={`mailto:${profile.email}`}
								className='text-sm font-bold hover:text-primary flex items-center gap-2 transition-colors'>
								<Mail className='h-5 w-5' /> Let&apos;s Talk
							</a>
						</div>
					</motion.div>

					{/* Profile Image */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1 }}
						className='lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2'>
						<div className='relative group'>
							<div className='absolute -inset-4 bg-linear-to-tr from-primary to-blue-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700' />

							<motion.div
								animate={{ y: [0, -15, 0] }}
								transition={{
									duration: 5,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								className='relative w-76 h-76 md:w-100 md:h-100 rounded-full overflow-hidden border-8 border-background shadow-2xl'>
								<Image
									src={profile.image}
									alt={profile.name}
									fill
									className='object-cover transform group-hover:scale-110 transition-transform duration-1000'
									priority
									sizes='(max-width: 768px) 288px, 384px'
								/>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

const SocialLink = ({
	href,
	icon,
}: {
	href: string;
	icon: React.ReactNode;
}) => (
	<Link
		href={href}
		target='_blank'
		className='text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300'>
		{icon}
	</Link>
);
