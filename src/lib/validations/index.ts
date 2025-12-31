/** @format */
import * as z from "zod";

// --- ENUMS (Mapped from Prisma) ---
export const AvailabilityEnum = z.enum([
	"AVAILABLE",
	"BUSY",
	"OPEN_FOR_COMMISSION",
]);

export const MessageStatusEnum = z.enum(["UNREAD", "READ", "ARCHIVED", "SPAM"]);

export const ProjectCategoryEnum = z.enum([
	"WEB_DEVELOPMENT",
	"MOBILE_APP",
	"UI_UX_DESIGN",
	"GRAPHIC_DESIGN",
	"DATA_SCIENCE",
	"AI",
	"OPEN_SOURCE",
	"OTHERS",
]);

// --- SHARED REUSABLE SCHEMAS ---

const techniqueSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, "Technique name required"),
	icon: z.string().optional().nullable(),
});

const tagSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, "Tag name required"),
});

// --- 1. IDENTITY & PROFILE ---
export const userSchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.string().email().optional().nullable(),
	phone: z.string().optional().nullable(),
	image: z.string().url().optional().nullable(),
});

export const profileSchema = z.object({
	email: z.string().email().default("contact@example.com"),
	phone: z.string().optional().nullable(),
	location: z.string().default("Remote / Yemen"),
});

export const contactMeSchema = z.object({
	githubUrl: z.string().url().or(z.literal("")).nullable(),
	linkedinUrl: z.string().url().or(z.literal("")).nullable(),
	xUrl: z.string().url().or(z.literal("")).nullable(),
	whatsapp: z.string().optional().nullable(),
	facebook: z.string().url().or(z.literal("")).nullable(),
	tiktok: z.string().url().or(z.literal("")).nullable(),
	figma: z.string().url().or(z.literal("")).nullable(),
});

// --- 2. HERO & ABOUT ---
export const heroSchema = z.object({
	status: AvailabilityEnum.default("AVAILABLE"),
	greeting: z.string().min(1, "Greeting is required"),
	name: z.string().min(1, "Name is required"),
	role: z.string().min(1, "Role is required"),
	description: z.string().min(10, "Description must be detailed"),
	primaryImage: z.string().url("Primary image must be a URL"),
	secondaryImages: z.array(z.string().url()).default([]),
	resumeUrl: z.string().url().or(z.literal("")).nullable().optional(),
	ctaText: z.string().default("Start a Project"),
});

export const corePillarSchema = z.object({
	title: z.string().min(2, "Pillar title required"),
	description: z.string().min(5, "Pillar description required"),
	icon: z.string().min(1, "Icon name required"),
});

export const aboutStatusSchema = z.object({
	label: z.string().min(1, "Label required"),
	value: z.string().min(1, "Value required"),
	isActive: z.boolean().default(true),
});

export const aboutSchema = z.object({
	title: z.string().min(2),
	subtitle: z.string().min(2),
	description: z.string().min(10),
	corePillars: z.array(corePillarSchema).min(1),
	statuses: z.array(aboutStatusSchema).min(1),
});

// --- 3. BLOG SYSTEM ---
/** @format */

// Types for Data Fetching

export const commentSchema = z.object({
	name: z.string().min(1, "Name is required"),
	content: z.string().min(1, "Comment cannot be empty"),
	blogId: z.string(),
});

// --- 4. WORK & EXPERIENCE ---
export const projectSchema = z.object({
	title: z.string().min(1, "Title is required"),
	slug: z.string().min(1, "Slug is required"),
	description: z.string().min(10, "Summary is required"),
	content: z.string().optional().nullable(),
	image: z.string().url("Main image required"),
	gallery: z.array(z.string().url()).default([]),
	category: ProjectCategoryEnum.default("WEB_DEVELOPMENT"),
	liveUrl: z.string().url().or(z.literal("")).nullable().optional(),
	repoUrl: z.string().url().or(z.literal("")).nullable().optional(),
	isFeatured: z.boolean().default(false),
	isActive: z.boolean().default(true),
	isPublished: z.boolean().default(true),
	techniques: z.array(techniqueSchema).default([]),
	tags: z.array(tagSchema).default([]),
});

export const experienceSchema = z.object({
	companyName: z.string().min(1, "Company name required"),
	role: z.string().min(1, "Role required"),
	location: z.string().optional().nullable(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullable().optional(),
	description: z.string().optional().nullable(),
	techniques: z.array(z.string()), // Array of technique IDs
});

export const educationSchema = z.object({
	id: z.string().optional(), // Important for updates!
	institution: z.string().min(1, "Required"),
	degree: z.string().min(1, "Required"),
	fieldOfStudy: z.string().min(1, "Required"),
	startDate: z.coerce.date(),
	endDate: z.coerce.date().nullable().optional(),
	grade: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
});

// --- 5. UTILITIES & CONFIG ---
export const skillSchema = z.object({
	name: z.string().min(1, "Skill name required"),
	level: z.number().int().min(0).max(100).nullable().optional(),
	icon: z.string().optional().nullable(),
});

export const skillCategorySchema = z.object({
	title: z.string().min(1, "Category title required"),
	icon: z.string().min(1, "Icon required"),
	order: z.number().int().default(0),
	isActive: z.boolean().default(true),
	skills: z.array(skillSchema).min(1),
});

export const testimonialSchema = z.object({
	clientName: z.string().min(2, "Name is required"),
	clientTitle: z.string().min(2, "Title is required (e.g., Founder)"),
	role: z
		.string()
		.min(2, "Role is required (e.g., CEO at TechCorp)")
		.optional(),
	content: z.string().min(10, "Please share a bit more about your experience"),
	rating: z.number().min(1).max(5).default(5),
	email: z.string().email("Invalid email").optional().or(z.literal("")),
	avatarUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
	linkedinUrl: z
		.string()
		.url("Invalid LinkedIn URL")
		.optional()
		.or(z.literal("")),
});

export const contactMessageSchema = z.object({
	name: z.string().min(1, "Name required"),
	email: z.string().email("Invalid email"),
	subject: z.string().optional().nullable(),
	message: z.string().min(10, "Message is too short"),
	status: MessageStatusEnum.default("UNREAD"),
});

export const siteConfigSchema = z.object({
	siteName: z.string().default("DevPortfolio"),
	footerText: z.string().min(1),
	profileViews: z.number().int().default(0),
	enableBlog: z.boolean().default(true),
	metaDescription: z.string().optional().nullable(),
});

export const CertificationSchema = z.object({
	title: z.string().min(2, "Title must be at least 2 characters"),
	issuer: z.string().min(2, "Issuer is required"),
	issueDate: z.string().min(1, "Issue date is required"),
	imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
	credentialId: z.string().optional().or(z.literal("")),
	link: z.string().url("Invalid credential link").optional().or(z.literal("")),
});
// Zod Schema for Form Validation
export const blogSchema = z.object({
	title: z.string().min(5, "Title is too short"),
	slug: z.string().min(2, "Slug is required"),
	category: z.string().min(1, "Category is required").default("General"),
	excerpt: z.string().max(250, "Excerpt is too long"),
	content: z.string().min(50, "Content is too short"),
	image: z.string().url("Cover image required"),
	gallery: z.array(z.string().url()).default([]),
	readTime: z.string().nullable().default("5 min"),
	isPublished: z.boolean().default(false),
	tags: z.array(tagSchema).default([]),
	publishedAt: z
		.date()
		.optional()
		.default(() => new Date()),
});
// --- EXPORTED TYPES ---
export type HeroFormValues = z.infer<typeof heroSchema>;
// export type IdentityFormValues = z.infer<typeof identitySchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ContactMeFormValues = z.infer<typeof contactMeSchema>;
export type AboutFormValues = z.infer<typeof aboutSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type BlogFormValues = z.infer<typeof blogSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type EducationFormValues = z.infer<typeof educationSchema>;
export type SkillCategoryFormValues = z.infer<typeof skillCategorySchema>;
export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
export type ContactMessageValues = z.infer<typeof contactMessageSchema>;
export type SiteConfigValues = z.infer<typeof siteConfigSchema>;
export type CertificationFormValues = z.infer<typeof CertificationSchema>;
