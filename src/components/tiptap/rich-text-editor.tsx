/** @format */

// /** @format */

// "use client";
// import "./tiptap.css";
// import { cn } from "@/lib/utils";
// import { ImageExtension } from "@/components/tiptap/extensions/image";
// import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder";
// import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace";
// import Highlight from "@tiptap/extension-highlight";
// import Link from "@tiptap/extension-link";
// import { Color } from "@tiptap/extension-color";
// import Subscript from "@tiptap/extension-subscript";
// import Superscript from "@tiptap/extension-superscript";
// import TextAlign from "@tiptap/extension-text-align";
// import { TextStyle } from "@tiptap/extension-text-style";
// import Typography from "@tiptap/extension-typography";
// import Underline from "@tiptap/extension-underline";
// import { EditorContent, type Extension, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { TipTapFloatingMenu } from "@/components/tiptap/extensions/floating-menu";
// import { FloatingToolbar } from "@/components/tiptap/extensions/floating-toolbar";
// import { EditorToolbar } from "./toolbars/editor-toolbar";
// import Placeholder from "@tiptap/extension-placeholder";
// import { content } from "@/lib/content";

// const extensions = [
// 	StarterKit.configure({
// 		orderedList: {
// 			HTMLAttributes: {
// 				class: "list-decimal",
// 			},
// 		},
// 		bulletList: {
// 			HTMLAttributes: {
// 				class: "list-disc",
// 			},
// 		},
// 		heading: {
// 			levels: [1, 2, 3, 4],
// 		},
// 	}),
// 	Placeholder.configure({
// 		emptyNodeClass: "is-editor-empty",
// 		placeholder: ({ node }) => {
// 			switch (node.type.name) {
// 				case "heading":
// 					return `Heading ${node.attrs.level}`;
// 				case "detailsSummary":
// 					return "Section title";
// 				case "codeBlock":
// 					// never show the placeholder when editing code
// 					return "";
// 				default:
// 					return "Write, type '/' for commands";
// 			}
// 		},
// 		includeChildren: false,
// 	}),
// 	TextAlign.configure({
// 		types: ["heading", "paragraph"],
// 	}),
// 	TextStyle,
// 	Subscript,
// 	Superscript,
// 	Underline,
// 	Link,
// 	Color,
// 	Highlight.configure({
// 		multicolor: true,
// 	}),
// 	ImageExtension,
// 	ImagePlaceholder,
// 	SearchAndReplace,
// 	Typography,
// ];

// export function RichTextEditor({ className }: { className?: string }) {
// 	const editor = useEditor({
// 		immediatelyRender: false,
// 		extensions: extensions as Extension[],
// 		content,
// 		editorProps: {
// 			attributes: {
// 				class: "max-w-full focus:outline-none",
// 			},
// 		},
// 		onUpdate: ({ editor }) => {
// 			// do what you want to do with output
// 			// Update stats
// 			// saving as text/json/hmtml
// 			// const text = editor.getHTML();
// 			console.log(editor.getText());
// 		},
// 	});

// 	if (!editor) return null;

// 	return (
// 		<div
// 			className={cn(
// 				"relative max-h-[calc(100dvh-6rem)]  w-full overflow-hidden overflow-y-scroll border bg-card pb-[60px] sm:pb-0",
// 				className,
// 			)}>
// 			<EditorToolbar editor={editor} />
// 			<FloatingToolbar editor={editor} />
// 			<TipTapFloatingMenu editor={editor} />
// 			<EditorContent
// 				editor={editor}
// 				className=' min-h-150 w-full min-w-full cursor-text sm:p-6'
// 			/>
// 		</div>
// 	);
// }
/** @format */

"use client";
import "./tiptap.css";
import { cn } from "@/lib/utils";
import { ImageExtension } from "@/components/tiptap/extensions/image";
import { ImagePlaceholder } from "@/components/tiptap/extensions/image-placeholder";
import SearchAndReplace from "@/components/tiptap/extensions/search-and-replace";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TipTapFloatingMenu } from "@/components/tiptap/extensions/floating-menu";
import { FloatingToolbar } from "@/components/tiptap/extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";

// Types for the controlled component
interface RichTextEditorProps {
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
}

const extensions = [
	StarterKit.configure({
		orderedList: { HTMLAttributes: { class: "list-decimal pl-4" } },
		bulletList: { HTMLAttributes: { class: "list-disc pl-4" } },
		heading: { levels: [1, 2, 3, 4] },
	}),
	Placeholder.configure({
		emptyNodeClass: "is-editor-empty",
		placeholder: "Write, type '/' for commands",
		includeChildren: false,
	}),
	TextAlign.configure({ types: ["heading", "paragraph"] }),
	TextStyle,
	Subscript,
	Superscript,
	Underline,
	Link,
	Color,
	Highlight.configure({ multicolor: true }),
	ImageExtension,
	ImagePlaceholder,
	SearchAndReplace,
	Typography,
];

export function RichTextEditor({
	value,
	onChange,
	className,
}: RichTextEditorProps) {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: extensions as Extension[],
		content: value || "", // Set initial content from props
		editorProps: {
			attributes: {
				class: "max-w-full focus:outline-none min-h-[300px]",
			},
		},
		onUpdate: ({ editor }) => {
			// Sync the editor content to the form state
			onChange?.(editor.getHTML());
		},
	});

	// Handle value changes from external sources (resetting forms, etc.)
	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || "");
		}
	}, [value, editor]);

	if (!editor) return null;

	return (
		<div
			className={cn(
				"relative max-h-[calc(100dvh-6rem)] w-full overflow-hidden border bg-card pb-15 sm:pb-0 rounded-md",
				className,
			)}>
			<EditorToolbar editor={editor} />
			<FloatingToolbar editor={editor} />
			<TipTapFloatingMenu editor={editor} />

			<ScrollArea className='h-full w-full'>
				<EditorContent
					editor={editor}
					className='min-h-[150px] w-full cursor-text p-4 sm:p-6'
				/>
			</ScrollArea>
		</div>
	);
}
