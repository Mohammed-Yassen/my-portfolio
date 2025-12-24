/** @format */
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

export async function getHeroData() {
	noStore(); // Ensures data isn't cached statically
	try {
		return await db.heroSection.findUnique({
			where: { id: "hero-static" },
		});
	} catch (error) {
		console.error("Fetch Error:", error);
		return null;
	}
}
export async function getAboutData() {
	noStore(); // Ensures data isn't cached statically
	try {
		return await db.aboutSection?.findFirst({
			include: { corePillars: true, statuses: true },
		});
	} catch (error) {
		console.error("Fetch Error:", error);
		return null;
	}
}
