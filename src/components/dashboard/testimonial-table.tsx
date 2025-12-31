/** @format */
"use client";

import { useState, useTransition } from "react";
import {
	updateTestimonialStatus,
	deleteTestimonial,
} from "@/actions/testimonial";
import { toast } from "sonner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Star, Trash2, ExternalLink } from "lucide-react";
import { Testimonial } from "@prisma/client";

export function TestimonialTable({ data }: { data: Testimonial[] }) {
	const [isPending, startTransition] = useTransition();

	const handleToggle = async (
		id: string,
		field: "isActive" | "isFeatured",
		currentVal: boolean,
	) => {
		startTransition(async () => {
			const result = await updateTestimonialStatus(id, {
				[field]: !currentVal,
			});
			if (result.success) toast.success(result.success);
			else toast.error(result.error);
		});
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure? This is permanent.")) return;

		startTransition(async () => {
			const result = await deleteTestimonial(id);
			if (result.success) toast.success(result.success);
			else toast.error(result.error);
		});
	};

	return (
		<div className='rounded-xl border bg-card'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Client</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Featured</TableHead>
						<TableHead>Rating</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell>
								<div className='font-medium'>{item.clientName}</div>
								<div className='text-xs text-muted-foreground'>
									{item.clientTitle}
								</div>
							</TableCell>
							<TableCell>
								<Badge variant={item.isActive ? "success" : "secondary"}>
									{item.isActive ? "Live" : "Pending"}
								</Badge>
							</TableCell>
							<TableCell>
								<Button
									variant='ghost'
									size='sm'
									onClick={() =>
										handleToggle(item.id, "isFeatured", item.isFeatured)
									}
									className={
										item.isFeatured
											? "text-yellow-500"
											: "text-muted-foreground"
									}>
									<Star
										className='h-4 w-4'
										fill={item.isFeatured ? "currentColor" : "none"}
									/>
								</Button>
							</TableCell>
							<TableCell>{item.rating}/5</TableCell>
							<TableCell className='text-right space-x-2'>
								<Button
									variant='outline'
									size='icon'
									onClick={() =>
										handleToggle(item.id, "isActive", item.isActive)
									}>
									{item.isActive ? (
										<XCircle className='h-4 w-4' />
									) : (
										<CheckCircle className='h-4 w-4' />
									)}
								</Button>
								<Button
									variant='destructive'
									size='icon'
									onClick={() => handleDelete(item.id)}>
									<Trash2 className='h-4 w-4' />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
