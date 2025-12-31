/** @format */
/** @format */
import * as z from "zod";
import { User, Profile, ContactMe } from "@prisma/client";

// --- ENUMS (Direct Mappings) ---

import { UserRole, Availability, MessageStatus } from "@prisma/client";

// --- ENUMS (Direct Mappings) ---
export const UserRoleEnum = z.nativeEnum(UserRole);
export const AvailabilityEnum = z.nativeEnum(Availability);
export const MessageStatusEnum = z.nativeEnum(MessageStatus);

export const loginSchema = z.object({
	email: z.string().trim().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
	// Optional: Add 2FA code here if you plan to implement it
	code: z.optional(z.string()),
});
/** @format */

export const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name is too long"),
		email: z.string().trim().email("Invalid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Must contain at least one uppercase letter")
			.regex(/[0-9]/, "Must contain at least one number"),
		acceptedTerms: z.boolean(),
	})
	.refine((data) => data.acceptedTerms === true, {
		// 2. Set the error path to the checkbox field
		message: "You must accept the terms and policies",
		path: ["acceptedTerms"],
	});

// --- TYPE INFERENCE ---
// This allows you to use: useForm<LoginFormValues> instead of z.infer every time.

// --- 2. PROFILE & SOCIALS ---
export const contactMeSchema = z.object({
	githubUrl: z.string().url().or(z.literal("")).nullable(),
	linkedinUrl: z.string().url().or(z.literal("")).nullable(),
	xUrl: z.string().url().or(z.literal("")).nullable(),
	whatsapp: z.string().optional().nullable(),
	figma: z.string().url().or(z.literal("")).nullable(),
});

export const profileSchema = z.object({
	professionalEmail: z.string().email().default("contact@example.com"),
	location: z.string().min(2).default("Remote / Yemen"),
	availability: AvailabilityEnum.default("AVAILABLE"),
});

// --- 3. MESSAGES & TESTIMONIALS ---
export const contactMessageSchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.string().email("Invalid email"),
	subject: z.string().optional().nullable(),
	message: z.string().min(10, "Message must be at least 10 characters"),
	status: MessageStatusEnum.default("UNREAD"),
});

export const testimonialSchema = z.object({
	clientName: z.string().min(2, "Client name is required"),
	clientTitle: z.string().min(2, "Client role/title is required"),
	content: z.string().min(10, "Testimonial content is too short").max(1000),
	avatarUrl: z.string().url().optional().nullable(),
	linkedinUrl: z.string().url().optional().nullable(),
	isFeatured: z.boolean().default(false),
	isActive: z.boolean().default(false),
});

// --- 4. UI STATE (Section Toggles) ---
export const sectionActiveSchema = z.object({
	heroActive: z.boolean().default(true),
	aboutActive: z.boolean().default(true),
	projectActive: z.boolean().default(true),
	blogActive: z.boolean().default(true),
	skillActive: z.boolean().default(true),
	certificationActive: z.boolean().default(true),
	experienceActive: z.boolean().default(true),
	educationActive: z.boolean().default(true),
	contactActive: z.boolean().default(true),
	testiActive: z.boolean().default(true),
});

// --- 5. EXPORTED TYPES ---
export type FullProfile = Profile & {
	user: User;
	socials: ContactMe | null;
};

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ContactMeFormValues = z.infer<typeof contactMeSchema>;
export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
export type ContactMessageValues = z.infer<typeof contactMessageSchema>;
export type SectionActiveValues = z.infer<typeof sectionActiveSchema>;
