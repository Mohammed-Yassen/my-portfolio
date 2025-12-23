/** @format */

export interface AboutData {
	title: string; // e.g., "A Hybrid Approach to Problem Solving"
	subtitle: string; // e.g., "My background in Security Research..."
	mainText: string; // The longer paragraph
	yearsExp: number; // e.g., 3
	projectsCount: number; // e.g., 20
	highlights: {
		title: string;
		description: string;
		icon: string; // To identify which Lucide icon to use
	}[];
}
export interface HeroData {
	name: string;
	role: string;
	description: string;
	status: string;
	primaryImage: string;
	email: string;
	resumeUrl: string;
	socialLinks?: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
}
export interface TestimonialData {
	quote: string;
	name: string;
	designation: string;
	src: string;
}
