/** @format */

export type Project = {
	id: number;
	title: string;
	description: string;
	tags: string[];
	datasets?: string[];
	tech: string[];
	link: string;
};

export const projects: Project[] = [
	{
		id: 1,
		title: "Transformer-based Intrusion Detection System",
		description:
			"An advanced IDS using multi-scale convolutions and transformers with focal loss to address class imbalance.",
		datasets: ["UNSW-NB15", "NSL-KDD"],
		tech: ["PyTorch", "Transformers", "Focal Loss"],
		tags: ["Research", "Cybersecurity", "AI"],
		link: "https://github.com/yourname/ids-mtran",
	},
	{
		id: 2,
		title: "Class-Imbalanced Attack Classification",
		description:
			"A multiclass attack classification pipeline with class-balanced focal loss and adaptive thresholding.",
		datasets: ["CIC-DDoS2019"],
		tech: ["PyTorch", "Sklearn", "Imbalance Learning"],
		tags: ["Machine Learning"],
		link: "https://github.com/yourname/attack-classifier",
	},
	{
		id: 3,
		title: "Personal Portfolio Website",
		description:
			"A modern portfolio built with Next.js, shadcn/ui, and Tailwind CSS focusing on clean UX and performance.",
		tech: ["Next.js", "TypeScript", "shadcn/ui"],
		tags: ["Web", "UI"],
		link: "https://yourwebsite.com",
	},
];
