/** @format */

import * as z from "zod";

export const AvailabilityEnum = z.enum([
	"AVAILABLE",
	"BUSY",
	"OPEN_FOR_COMMISSION",
]);

const corePillarSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(2, "Pillar title required"),
	description: z.string().min(5, "Pillar description required"),
	icon: z.string().min(1, "Icon name required"),
});

export const identitySchema = z.object({
	hero: z.object({
		status: AvailabilityEnum,
		greeting: z.string().min(1),
		name: z.string().min(1),
		role: z.string().min(1),
		description: z.string().min(1),
		primaryImage: z.string().min(1),
		secondaryImages: z.array(z.string()).default([]),
		resumeUrl: z.string().nullable().optional(),
		ctaText: z.string().default("Start a Project"),
		githubUrl: z.string().url().or(z.literal("")).nullable(),
		linkedinUrl: z.string().url().or(z.literal("")).nullable(),
	}),
	about: z.object({
		title: z.string().min(2),
		subtitle: z.string().min(2),
		description: z.string().min(10),
		yearsExp: z.coerce.number().int().nonnegative(),
		projectsCount: z.coerce.number().int().nonnegative(),
		corePillars: z.array(corePillarSchema).min(1),
	}),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;
