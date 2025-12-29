/** @format */

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	datasource: {
		url: env("DATABASE_URL"), // This pulls the URL with pgbouncer=true
	},
	migrations: {
		// This tells Prisma how to execute your seed file
		seed: "npx dlx tsx ./prisma/seed.ts",
	},
});
