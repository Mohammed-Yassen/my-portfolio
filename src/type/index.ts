/** @format */
import {
	HeroSection,
	AboutSection,
	CorePillars,
	AboutStatus,
} from "@prisma/client";

// 1. Expand the Prisma type to include relations
export type AboutWithRelations = AboutSection & {
	corePillars: CorePillars[];
	statuses: AboutStatus[];
};
// 2. Define the shape of data passed from Server to Client
export interface IdentityInitialData {
	hero: HeroSection | null;
	about: AboutWithRelations | null;
}

// 3. Component Prop Interface
export interface IdentityFormProps {
	initialData: IdentityInitialData;
}
