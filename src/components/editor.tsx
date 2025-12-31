/** @format */

import { RichTextEditor } from "./tiptap/rich-text-editor";

// /** @format */
// "use client";

// import React, { useCallback, useRef } from "react";
// import { useEditor, EditorContent, type Editor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
// import Placeholder from "@tiptap/extension-placeholder";
// import CharacterCount from "@tiptap/extension-character-count";
// import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import TextAlign from "@tiptap/extension-text-align";
// import Highlight from "@tiptap/extension-highlight";
// import { common, createLowlight } from "lowlight";

// import {
// 	Bold,
// 	Italic,
// 	List,
// 	ListOrdered,
// 	Heading1,
// 	Heading2,
// 	Heading3,
// 	Quote,
// 	Image as ImageIcon,
// 	Link as LinkIcon,
// 	Code2,
// 	Redo2,
// 	Undo2,
// 	Strikethrough,
// 	Type,
// 	Upload,
// 	AlignLeft,
// 	AlignCenter,
// 	AlignRight,
// 	Highlighter,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipProvider,
// 	TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Separator } from "@/components/ui/separator";

// const lowlight = createLowlight(common);

// /** --- Sub-Component: Menu Button --- */
// interface MenuButtonProps {
// 	onClick: () => void;
// 	isActive?: boolean;
// 	disabled?: boolean;
// 	tooltip: string;
// 	children: React.ReactNode;
// }

// const MenuButton = ({
// 	onClick,
// 	isActive,
// 	disabled,
// 	tooltip,
// 	children,
// }: MenuButtonProps) => (
// 	<TooltipProvider delayDuration={200}>
// 		<Tooltip>
// 			<TooltipTrigger asChild>
// 				<Button
// 					type='button'
// 					size='icon'
// 					variant={isActive ? "default" : "ghost"}
// 					className='h-8 w-8 transition-colors'
// 					onClick={(e) => {
// 						e.preventDefault();
// 						onClick();
// 					}}
// 					disabled={disabled}>
// 					{children}
// 				</Button>
// 			</TooltipTrigger>
// 			<TooltipContent side='top' className='text-[10px] font-medium'>
// 				{tooltip}
// 			</TooltipContent>
// 		</Tooltip>
// 	</TooltipProvider>
// );

// /** --- The Toolbar (Stays at Top) --- */
// const MenuBar = ({ editor }: { editor: Editor }) => {
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	const addImage = useCallback(() => {
// 		const url = window.prompt("Enter Image URL");
// 		if (url) editor.chain().focus().setImage({ src: url }).run();
// 	}, [editor]);

// 	const setLink = useCallback(() => {
// 		const previousUrl = editor.getAttributes("link").href;
// 		const url = window.prompt("URL", previousUrl);
// 		if (url === null) return;
// 		if (url === "") {
// 			editor.chain().focus().extendMarkRange("link").unsetLink().run();
// 			return;
// 		}
// 		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
// 	}, [editor]);

// 	return (
// 		<div className='flex flex-wrap items-center gap-1 p-2 border-b bg-muted/20 backdrop-blur-md'>
// 			<input
// 				type='file'
// 				ref={fileInputRef}
// 				className='hidden'
// 				accept='image/*'
// 				onChange={(e) => {
// 					const file = e.target.files?.[0];
// 					if (file) {
// 						const reader = new FileReader();
// 						reader.onload = (event) =>
// 							editor
// 								.chain()
// 								.focus()
// 								.setImage({ src: event.target?.result as string })
// 								.run();
// 						reader.readAsDataURL(file);
// 					}
// 				}}
// 			/>

// 			{/* History */}
// 			<MenuButton
// 				tooltip='Undo'
// 				onClick={() => editor.chain().focus().undo().run()}
// 				disabled={!editor.can().undo()}>
// 				<Undo2 size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Redo'
// 				onClick={() => editor.chain().focus().redo().run()}
// 				disabled={!editor.can().redo()}>
// 				<Redo2 size={16} />
// 			</MenuButton>

// 			<Separator orientation='vertical' className='mx-1 h-6' />

// 			{/* Headings */}
// 			<MenuButton
// 				tooltip='H1'
// 				isActive={editor.isActive("heading", { level: 1 })}
// 				onClick={() =>
// 					editor.chain().focus().toggleHeading({ level: 1 }).run()
// 				}>
// 				<Heading1 size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='H2'
// 				isActive={editor.isActive("heading", { level: 2 })}
// 				onClick={() =>
// 					editor.chain().focus().toggleHeading({ level: 2 }).run()
// 				}>
// 				<Heading2 size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='H3'
// 				isActive={editor.isActive("heading", { level: 3 })}
// 				onClick={() =>
// 					editor.chain().focus().toggleHeading({ level: 3 }).run()
// 				}>
// 				<Heading3 size={16} />
// 			</MenuButton>

// 			<Separator orientation='vertical' className='mx-1 h-6' />

// 			{/* Formatting */}
// 			<MenuButton
// 				tooltip='Bold'
// 				isActive={editor.isActive("bold")}
// 				onClick={() => editor.chain().focus().toggleBold().run()}>
// 				<Bold size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Italic'
// 				isActive={editor.isActive("italic")}
// 				onClick={() => editor.chain().focus().toggleItalic().run()}>
// 				<Italic size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Strike'
// 				isActive={editor.isActive("strike")}
// 				onClick={() => editor.chain().focus().toggleStrike().run()}>
// 				<Strikethrough size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Highlight'
// 				isActive={editor.isActive("highlight")}
// 				onClick={() => editor.chain().focus().toggleHighlight().run()}>
// 				<Highlighter size={16} />
// 			</MenuButton>

// 			<Separator orientation='vertical' className='mx-1 h-6' />

// 			{/* Alignment */}
// 			<MenuButton
// 				tooltip='Left'
// 				isActive={editor.isActive({ textAlign: "left" })}
// 				onClick={() => editor.chain().focus().setTextAlign("left").run()}>
// 				<AlignLeft size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Center'
// 				isActive={editor.isActive({ textAlign: "center" })}
// 				onClick={() => editor.chain().focus().setTextAlign("center").run()}>
// 				<AlignCenter size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Right'
// 				isActive={editor.isActive({ textAlign: "right" })}
// 				onClick={() => editor.chain().focus().setTextAlign("right").run()}>
// 				<AlignRight size={16} />
// 			</MenuButton>

// 			<Separator orientation='vertical' className='mx-1 h-6' />

// 			{/* Lists & Blocks */}
// 			<MenuButton
// 				tooltip='Bullet List'
// 				isActive={editor.isActive("bulletList")}
// 				onClick={() => editor.chain().focus().toggleBulletList().run()}>
// 				<List size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Ordered List'
// 				isActive={editor.isActive("orderedList")}
// 				onClick={() => editor.chain().focus().toggleOrderedList().run()}>
// 				<ListOrdered size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Quote'
// 				isActive={editor.isActive("blockquote")}
// 				onClick={() => editor.chain().focus().toggleBlockquote().run()}>
// 				<Quote size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Code Block'
// 				isActive={editor.isActive("codeBlock")}
// 				onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
// 				<Code2 size={16} />
// 			</MenuButton>

// 			<Separator orientation='vertical' className='mx-1 h-6' />

// 			{/* Media */}
// 			<MenuButton
// 				tooltip='Link'
// 				isActive={editor.isActive("link")}
// 				onClick={setLink}>
// 				<LinkIcon size={16} />
// 			</MenuButton>
// 			<MenuButton
// 				tooltip='Upload'
// 				onClick={() => fileInputRef.current?.click()}>
// 				<Upload size={16} />
// 			</MenuButton>
// 			<MenuButton tooltip='Image URL' onClick={addImage}>
// 				<ImageIcon size={16} />
// 			</MenuButton>
// 		</div>
// 	);
// };

// /** --- Main Editor Component --- */
// export const RichEditor = ({
// 	value,
// 	onChange,
// }: {
// 	value: string;
// 	onChange: (v: string) => void;
// }) => {
// 	const editor = useEditor({
// 		immediatelyRender: false,
// 		extensions: [
// 			StarterKit.configure({
// 				heading: { levels: [1, 2, 3, 4, 5, 6] },
// 				bulletList: { HTMLAttributes: { class: "list-disc ml-4 space-y-1" } },
// 				orderedList: {
// 					HTMLAttributes: { class: "list-decimal ml-4 space-y-1" },
// 				},
// 				codeBlock: false,
// 			}),
// 			TextAlign.configure({ types: ["heading", "paragraph"] }),
// 			Highlight.configure({ multicolor: true }),
// 			CodeBlockLowlight.configure({ lowlight }),
// 			CharacterCount,
// 			Image.configure({
// 				HTMLAttributes: {
// 					class: "rounded-lg border shadow-sm max-w-full my-4 mx-auto block",
// 				},
// 			}),
// 			Link.configure({
// 				HTMLAttributes: {
// 					class: "text-primary underline underline-offset-4 font-medium",
// 				},
// 			}),
// 			Placeholder.configure({ placeholder: "Write something amazing..." }),
// 		],
// 		content: value,
// 		editorProps: {
// 			attributes: {
// 				class:
// 					"prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none p-6 min-h-full " +
// 					"prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4 " +
// 					"prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 " +
// 					"prose-h3:text-xl prose-h3:font-medium " +
// 					"prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic",
// 			},
// 		},
// 		onUpdate: ({ editor }) => onChange(editor.getHTML()),
// 	});

// 	if (!editor) return null;

// 	return (
// 		<div className='flex flex-col border rounded-xl bg-background shadow-sm overflow-hidden min-h-[400px] max-h-[80vh]'>
// 			{/* Header: Static at top */}
// 			<MenuBar editor={editor} />

// 			{/* Content: Scrollable area */}
// 			<div className='flex-1 overflow-y-auto bg-card scroll-smooth custom-scrollbar'>
// 				<EditorContent editor={editor} />
// 			</div>

// 			{/* Footer: Static at bottom */}
// 			<div className='flex-none px-4 py-2 border-t bg-muted/30 flex justify-between items-center text-[11px] text-muted-foreground font-medium uppercase tracking-wider'>
// 				<div className='flex gap-4'>
// 					<span>{editor.storage.characterCount.words()} Words</span>
// 					<span>{editor.storage.characterCount.characters()} Characters</span>
// 				</div>
// 				<div className='flex items-center gap-1 opacity-50'>
// 					<div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
// 					Editor Live
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

export default function Editor() {
	return (
		<div className='mx-auto w-full container flex flex-col justify-center items-center py-5'>
			<RichTextEditor className='col-span-full w-full' />
		</div>
	);
}
