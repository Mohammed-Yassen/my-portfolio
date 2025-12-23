/** @format */

"use client";

import * as React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 1. Define standard viewport animations via CVA-like logic
const viewportVariants: Record<string, Variants> = {
	fadeInUp: {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	},
	fadeInLeft: {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
	},
	scaleUp: {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
	},
};

// 2. Class variations for different layout behaviors
const motionVariants = cva("relative", {
	variants: {
		variant: {
			default: "",
			card: "rounded-xl border bg-card text-card-foreground shadow-sm",
			glass: "backdrop-blur-md bg-white/5 border border-white/10",
		},
		hover: {
			none: "",
			lift: "hover:-translate-y-2 transition-transform duration-300",
			glow: "hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-shadow",
		},
	},
	defaultVariants: {
		variant: "default",
		hover: "none",
	},
});

// 3. Types: Using Omit to prevent deep recursion/infinite type errors
interface MotionViewportProps
	extends Omit<HTMLMotionProps<"div">, "variant">,
		VariantProps<typeof motionVariants> {
	preset?: keyof typeof viewportVariants;
	delay?: number;
	as?: "div" | "section" | "article" | "li" | "ul" | "nav";
}

const MotionViewport = React.forwardRef<HTMLDivElement, MotionViewportProps>(
	(
		{
			className,
			variant,
			hover,
			preset = "fadeInUp",
			delay = 0,
			as = "div",
			...props
		},
		ref,
	) => {
		// Dynamically choose the motion component safely
		const MotionComponent = (motion as any)[as];

		return (
			<MotionComponent
				ref={ref}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-50px" }}
				variants={viewportVariants[preset]}
				transition={{
					duration: 0.5,
					delay,
					ease: [0.21, 0.47, 0.32, 0.98],
				}}
				className={cn(motionVariants({ variant, hover, className }))}
				{...props}
			/>
		);
	},
);

MotionViewport.displayName = "MotionViewport";

export { MotionViewport, motionVariants };
