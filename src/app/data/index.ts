/** @format */
import { db } from "@/lib/db/db";
import { unstable_noStore as noStore } from "next/cache";

import { Certification, HeroSection, Testimonial } from "@prisma/client";
import {
	BlogWithRelations,
	FullAboutSection,
	ProjectWithRelations,
	SkillCategoryWithSkills,
} from "@/type";

// --- HERO SECTION ---
export async function getHeroData(): Promise<HeroSection | null> {
	noStore();
	try {
		return await db.heroSection.findUnique({
			where: { id: "hero-static" },
		});
	} catch (error) {
		console.error("Hero Fetch Error:", error);
		return null;
	}
}

// --- ABOUT SECTION ---
export async function getAboutData(): Promise<FullAboutSection | null> {
	noStore();
	try {
		return (await db.aboutSection.findFirst({
			include: { corePillars: true, statuses: true },
		})) as FullAboutSection;
	} catch (error) {
		console.error("About Fetch Error:", error);
		return null;
	}
}

// --- SKILLS DATA ---
export async function getSkillData(): Promise<SkillCategoryWithSkills[]> {
	noStore();
	try {
		const categories = await db.skillCategory.findMany({
			where: { isActive: true },
			include: {
				skills: { orderBy: { name: "asc" } },
			},
			orderBy: { order: "asc" },
		});
		return categories as SkillCategoryWithSkills[];
	} catch (error) {
		console.error("Skill Fetch Error:", error);
		return [];
	}
}

// --- PROJECTS ---
export async function getProjectById(
	id: string,
): Promise<ProjectWithRelations | null> {
	if (!id) return null;
	try {
		return (await db.project.findUnique({
			where: { id },
			include: { techniques: true, tags: true },
		})) as ProjectWithRelations;
	} catch (error) {
		console.error("Project Fetch Error:", error);
		return null;
	}
}

export async function getFeaturedProjects(): Promise<ProjectWithRelations[]> {
	noStore();
	try {
		return (await db.project.findMany({
			where: { isFeatured: true, isActive: true, isPublished: true },
			include: { techniques: true, tags: true },
			orderBy: { createdAt: "desc" },
			take: 6, // Limit for homepage performance
		})) as ProjectWithRelations[];
	} catch (error) {
		console.error("Featured Projects Fetch Error:", error);
		return [];
	}
}

// --- BLOGS ---
export async function getPublishedBlogs(): Promise<BlogWithRelations[]> {
	noStore();
	try {
		return (await db.blog.findMany({
			where: { isPublished: true },
			include: {
				tags: true,
				_count: { select: { likes: true, comments: true } },
			},
			orderBy: { publishedAt: "desc" },
		})) as BlogWithRelations[];
	} catch (error) {
		console.error("Blog Fetch Error:", error);
		return [];
	}
}

// --- TESTIMONIALS ---
export async function getTestimonials(): Promise<Testimonial[]> {
	try {
		return await db.testimonial.findMany({
			where: { isActive: true },
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		return [];
	}
}
export async function getExperiences() {
	try {
		const experiences = await db.experience.findMany({
			include: {
				techniques: true, // This populates the Technique[] array
			},
			orderBy: {
				startDate: "desc",
			},
		});
		return experiences;
	} catch (error) {
		console.error("DB_FETCH_EXPERIENCE_ERROR:", error);
		return [];
	}
}
// app/data.ts

export async function getAllTechniques() {
	return await db.technique.findMany({
		orderBy: { name: "asc" },
	});
}

/**
 * GET EDUCATION
 * Fetches academic records, sorted by end date (most recent first).
 */
export async function getEducation() {
	try {
		const education = await db.education.findMany({
			orderBy: {
				endDate: "desc",
			},
		});
		return education;
	} catch (error) {
		console.error("DB_FETCH_EDUCATION_ERROR:", error);
		return [];
	}
}

type ActionResponse<T = Certification[]> = {
	success: boolean;
	data?: T;
	error?: string;
};

// GET ALL
export async function getCertifications(): Promise<ActionResponse> {
	try {
		const data = await db.certification.findMany({
			orderBy: { createdAt: "desc" },
		});

		// FIX: You must actually return the data you fetched
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		console.error("DB_FETCH_CERT_ERROR:", error);
		// FIX: Must return an object, not an array [], to match ActionResponse
		return {
			success: false,
			error: "Failed to fetch certifications.",
		};
	}
}
type ActionResp<T = Certification> = {
	success: boolean;
	data?: T;
	error?: string;
};
// GET SINGLE
export async function getCertificationById(id: string): Promise<ActionResp> {
	try {
		if (!id) return { success: false, error: "ID is required" };

		const cert = await db.certification.findUnique({
			where: { id },
		});

		if (!cert) return { success: false, error: "Certification not found" };

		return {
			success: true,
			data: cert,
		};
	} catch (error) {
		console.error("DB_FETCH_SINGLE_CERT_ERROR:", error);
		return {
			success: false,
			error: "An error occurred while fetching the record.",
		};
	}
}
// src/lib/queries/blogs.ts
