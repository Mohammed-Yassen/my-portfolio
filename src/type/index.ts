/** @format */
import {
	User,
	Profile,
	ContactMe,
	HeroSection,
	AboutSection,
	AboutStatus,
	CorePillar,
	Blog,
	Tag,
	Comment,
	Project,
	Experience,
	Education,
	Technique,
	SkillCategory,
	Skill,
	Testimonial,
	ContactMessage,
	SiteConfig,
} from "@prisma/client";

// Use types for Data Shapes
export type FullProfile = Profile & {
	user: User;
	socials: ContactMe | null;
};

export type FullAboutSection = AboutSection & {
	corePillars: CorePillar[];
	statuses: AboutStatus[];
};

export type BlogWithRelations = Blog & {
	tags: Tag[];
	comments: Comment[];
	_count: {
		likes: number;
		comments: number;
	};
};

export type ProjectWithRelations = Project & {
	techniques: Technique[];
	tags: Tag[];
};

export type ExperienceWithRelations = Experience & {
	techniques: Technique[];
};

export type SkillCategoryWithSkills = SkillCategory & {
	skills: Skill[];
};
