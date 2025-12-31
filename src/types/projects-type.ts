/** @format */

type Technique = {
	id: string;
	name: string;
};

type Tag = {
	id: string;
	name: string;
};

export type Project = {
	id: string;
	title: string;
	slug: string;
	description: string;
	content: string;
	image: string;
	category: string;
	liveUrl: string;
	repoUrl: string;

	isActive: boolean;
	isFeatured: boolean;
	isPublished: boolean;

	techniques: Technique[];

	tags: Tag[];
};
