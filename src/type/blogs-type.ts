/** @format */
import { Prisma } from "@prisma/client";

export const blogInclude = {
	tags: true,
	_count: {
		select: {
			comments: true,
			likes: true,
		},
	},
} satisfies Prisma.BlogInclude;

export type BlogWithRelations = Prisma.BlogGetPayload<{
	include: typeof blogInclude;
}>;
