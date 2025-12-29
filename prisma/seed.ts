/** @format */

import { Availability, PrismaClient, ProjectCategory } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

// Leave empty to let prisma.config.ts handle the connection
const prisma = new PrismaClient();

async function main() {
	console.log("⏳ Starting Deep Database Seed...");

	// --- 1. CLEANUP (Ordered to respect foreign keys) ---
	await prisma.skill.deleteMany();
	await prisma.skillCategory.deleteMany();
	await prisma.technique.deleteMany();
	await prisma.project.deleteMany();
	await prisma.heroSection.deleteMany();
	await prisma.aboutStatus.deleteMany();
	await prisma.corePillar.deleteMany();
	await prisma.aboutSection.deleteMany();
	await prisma.blog.deleteMany();
	await prisma.tag.deleteMany();
	await prisma.testimonial.deleteMany();
	await prisma.siteConfig.deleteMany();
	await prisma.contactMe.deleteMany();
	await prisma.profile.deleteMany();
	await prisma.user.deleteMany();

	// --- 2. IDENTITY ---
	const user = await prisma.user.create({
		data: {
			name: "Mohammed Yaseen",
			email: "mohammed@example.com",
			image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
			profile: {
				create: {
					id: "owner-static",
					location: "Sana'a, Yemen",
					email: "contact@m-yaseen.dev",
					socials: {
						create: {
							githubUrl: "https://github.com/yaseen",
							linkedinUrl: "https://linkedin.com/in/yaseen",
						},
					},
				},
			},
		},
	});

	// --- 3. HERO & ABOUT ---
	await prisma.heroSection.create({
		data: {
			id: "hero-static",
			status: Availability.AVAILABLE,
			description:
				"Building resilient, high-performance systems with a focus on AI and Security.",
			primaryImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
		},
	});

	await prisma.aboutSection.create({
		data: {
			id: "about-static",
			description:
				"Bridging the gap between research and scalable software engineering.",
			corePillars: {
				create: [
					{
						title: "Security First",
						description: "Hardened codebases.",
						icon: "Shield",
					},
					{
						title: "AI Research",
						description: "Smart automation.",
						icon: "Cpu",
					},
				],
			},
			statuses: {
				create: [
					{ label: "Experience", value: "5+ Years" },
					{ label: "Projects", value: "40+" },
				],
			},
		},
	});

	// --- 4. TECHNIQUES & TAGS ---
	const techList = [
		"Next.js",
		"TypeScript",
		"PostgreSQL",
		"Python",
		"TailwindCSS",
	];
	const techs = await Promise.all(
		techList.map((name) =>
			prisma.technique.create({ data: { name, icon: name.toLowerCase() } }),
		),
	);
	const tagTech = await prisma.tag.create({ data: { name: "Technology" } });

	// --- 5. SKILLS ---
	const categories = [
		{ title: "Frontend", skills: ["React", "Next.js", "Tailwind"] },
		{ title: "Backend", skills: ["Node.js", "Prisma", "PostgreSQL"] },
	];

	for (let i = 0; i < categories.length; i++) {
		await prisma.skillCategory.create({
			data: {
				title: categories[i].title,
				icon: "Code",
				order: i,
				skills: {
					create: categories[i].skills.map((s) => ({ name: s, level: 90 })),
				},
			},
		});
	}

	// --- 6. 8 PROJECTS ---
	const categoriesList = Object.values(ProjectCategory);
	for (let i = 1; i <= 8; i++) {
		await prisma.project.create({
			data: {
				title: `Innovation Project ${i}`,
				slug: `project-slug-${i}`,
				description: `This is a high-level description for project number ${i}.`,
				image: `https://picsum.photos/seed/project${i}/800/600`,
				category: categoriesList[i % categoriesList.length],
				isFeatured: i <= 3,
				techniques: { connect: [{ id: techs[i % techs.length].id }] },
				tags: { connect: [{ id: tagTech.id }] },
			},
		});
	}

	// --- 7. 8 BLOGS ---
	for (let i = 1; i <= 8; i++) {
		await prisma.blog.create({
			data: {
				title: `The Future of Tech: Part ${i}`,
				slug: `blog-post-${i}`,
				excerpt: `Discover how technology is evolving in our latest series, part ${i}.`,
				content: "Detailed technical content goes here...",
				image: `https://picsum.photos/seed/blog${i}/1200/800`,
				isPublished: true,
				tags: { connect: [{ id: tagTech.id }] },
			},
		});
	}

	// --- 8. SITE CONFIG ---
	await prisma.siteConfig.create({
		data: {
			footerText: "© 2025 Mohammed Yaseen. All rights reserved.",
			enableBlog: true,
		},
	});

	console.log("✅ Seed complete! Your portfolio is now fully populated.");
}

main()
	.then(async () => await prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
