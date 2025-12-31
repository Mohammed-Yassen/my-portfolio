/** @format */

"use client";

import { type Editor } from "@tiptap/react";
import { useCallback, useEffect, useState, useRef } from "react";
import { BoldToolbar } from "../toolbars/bold";
import { ItalicToolbar } from "../toolbars/italic";
import { UnderlineToolbar } from "../toolbars/underline";
import { LinkToolbar } from "../toolbars/link";
import { ColorHighlightToolbar } from "../toolbars/color-and-highlight";
import { ToolbarProvider } from "../toolbars/toolbar-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HeadingsToolbar } from "../toolbars/headings";
import { BulletListToolbar } from "../toolbars/bullet-list";
import { OrderedListToolbar } from "../toolbars/ordered-list";
import { ImagePlaceholderToolbar } from "../toolbars/image-placeholder-toolbar";
import { AlignmentTooolbar } from "../toolbars/alignment";
import { BlockquoteToolbar } from "../toolbars/blockquote";
import { useMediaQuery } from "@/app/hooks/use-media-querry";
import { createPortal } from "react-dom";

export function FloatingToolbar({ editor }: { editor: Editor | null }) {
	const isMobile = useMediaQuery("(max-width: 640px)");
	const [show, setShow] = useState(false);
	const [position, setPosition] = useState({ top: 0, left: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	const updatePosition = useCallback(() => {
		if (!editor || !editor.isFocused || editor.state.selection.empty) {
			setShow(false);
			return;
		}

		const { view } = editor;
		const { state } = view;
		const { from, to } = state.selection;

		// Get coordinates of the selection
		const start = view.coordsAtPos(from);
		const end = view.coordsAtPos(to);

		// Calculate center and top
		const left = (start.left + end.left) / 2;
		const top = start.top;

		setPosition({ top, left });
		setShow(true);
	}, [editor]);

	useEffect(() => {
		if (!editor) return;

		editor.on("selectionUpdate", updatePosition);
		editor.on("focus", updatePosition);
		editor.on("blur", () => {
			// Delay hide to allow clicks on the toolbar itself
			setTimeout(() => {
				if (!document.activeElement?.closest(".floating-toolbar-container")) {
					setShow(false);
				}
			}, 100);
		});

		window.addEventListener("scroll", updatePosition, true);
		window.addEventListener("resize", updatePosition);

		return () => {
			editor.off("selectionUpdate", updatePosition);
			editor.off("focus", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
			window.removeEventListener("resize", updatePosition);
		};
	}, [editor, updatePosition]);

	if (!editor || !show || !isMobile) return null;

	// Render into a Portal to avoid z-index and overflow issues
	return createPortal(
		<div
			ref={containerRef}
			className='floating-toolbar-container fixed z-[9999] -translate-x-1/2 -translate-y-full pb-3 transition-all duration-200'
			style={{
				top: position.top,
				left: position.left,
			}}>
			<div className='w-[92vw] max-w-[400px] shadow-xl border rounded-md bg-background overflow-hidden animate-in fade-in zoom-in-95 duration-100'>
				<TooltipProvider>
					<ToolbarProvider editor={editor}>
						<ScrollArea className='h-fit py-1 w-full'>
							<div className='flex items-center px-2 gap-0.5'>
								<div className='flex items-center gap-0.5 p-1'>
									<BoldToolbar />
									<ItalicToolbar />
									<UnderlineToolbar />
									<Separator orientation='vertical' className='h-6 mx-1' />

									<HeadingsToolbar />
									<BulletListToolbar />
									<OrderedListToolbar />
									<Separator orientation='vertical' className='h-6 mx-1' />

									<ColorHighlightToolbar />
									<LinkToolbar />
									<ImagePlaceholderToolbar />
									<Separator orientation='vertical' className='h-6 mx-1' />

									<AlignmentTooolbar />
									<BlockquoteToolbar />
								</div>
							</div>
							<ScrollBar className='h-1' orientation='horizontal' />
						</ScrollArea>
					</ToolbarProvider>
				</TooltipProvider>
			</div>
		</div>,
		document.body,
	);
}
