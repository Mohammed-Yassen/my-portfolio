/** @format */
"use client";

import React, { useCallback, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

import {
	Bold,
	Italic,
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Quote,
	Image as ImageIcon,
	Link as LinkIcon,
	Code2,
	Redo2,
	Undo2,
	Strikethrough,
	Type,
	Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

const lowlight = createLowlight(common);

interface EditorProps {
	value: string;
	onChange: (value: string) => void;
}

/** --- Sub-Component: MenuButton --- */
const MenuButton = ({
	onClick,
	isActive = false,
	children,
	tooltip,
	disabled = false,
}: {
	onClick: () => void;
	isActive?: boolean;
	children: React.ReactNode;
	tooltip: string;
	disabled?: boolean;
}) => (
	<TooltipProvider delayDuration={200}>
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					type='button'
					size='icon'
					variant={isActive ? "default" : "ghost"}
					className='h-8 w-8 transition-colors'
					onClick={onClick}
					disabled={disabled}>
					{children}
				</Button>
			</TooltipTrigger>
			<TooltipContent side='top' className='text-xs'>
				{tooltip}
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

/** --- Sub-Component: MenuBar --- */
const MenuBar = ({ editor }: { editor: Editor }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	// PC Image Upload Logic
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				editor.chain().focus().setImage({ src: result }).run();
			};
			reader.readAsDataURL(file);
		}
	};

	const setLink = useCallback(() => {
		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("URL", previousUrl);
		if (url === null) return;
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	}, [editor]);

	return (
		<div className='flex flex-wrap items-center gap-1 p-1.5 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-md'>
			{/* Hidden Input for PC Upload */}
			<input
				type='file'
				ref={fileInputRef}
				className='hidden'
				accept='image/*'
				onChange={handleImageUpload}
			/>

			<MenuButton
				tooltip='Undo'
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}>
				<Undo2 size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Redo'
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}>
				<Redo2 size={16} />
			</MenuButton>

			<Separator orientation='vertical' className='mx-1 h-6' />

			<MenuButton
				tooltip='Heading 1'
				isActive={editor.isActive("heading", { level: 1 })}
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}>
				<Heading1 size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Heading 2'
				isActive={editor.isActive("heading", { level: 2 })}
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}>
				<Heading2 size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Text'
				isActive={editor.isActive("paragraph")}
				onClick={() => editor.chain().focus().setParagraph().run()}>
				<Type size={16} />
			</MenuButton>

			<Separator orientation='vertical' className='mx-1 h-6' />

			<MenuButton
				tooltip='Bold'
				isActive={editor.isActive("bold")}
				onClick={() => editor.chain().focus().toggleBold().run()}>
				<Bold size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Italic'
				isActive={editor.isActive("italic")}
				onClick={() => editor.chain().focus().toggleItalic().run()}>
				<Italic size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Strike'
				isActive={editor.isActive("strike")}
				onClick={() => editor.chain().focus().toggleStrike().run()}>
				<Strikethrough size={16} />
			</MenuButton>

			<Separator orientation='vertical' className='mx-1 h-6' />

			<MenuButton
				tooltip='Bullets'
				isActive={editor.isActive("bulletList")}
				onClick={() => editor.chain().focus().toggleBulletList().run()}>
				<List size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Numbers'
				isActive={editor.isActive("orderedList")}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}>
				<ListOrdered size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Quote'
				isActive={editor.isActive("blockquote")}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}>
				<Quote size={16} />
			</MenuButton>
			<MenuButton
				tooltip='Code Block'
				isActive={editor.isActive("codeBlock")}
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
				<Code2 size={16} />
			</MenuButton>

			<Separator orientation='vertical' className='mx-1 h-6' />

			<MenuButton
				tooltip='Link'
				isActive={editor.isActive("link")}
				onClick={setLink}>
				<LinkIcon size={16} />
			</MenuButton>

			<MenuButton
				tooltip='Upload Image from PC'
				onClick={() => fileInputRef.current?.click()}>
				<Upload size={16} />
			</MenuButton>

			<MenuButton
				tooltip='Image via URL'
				onClick={() => {
					const url = window.prompt("Enter Image URL");
					if (url) editor.chain().focus().setImage({ src: url }).run();
				}}>
				<ImageIcon size={16} />
			</MenuButton>
		</div>
	);
};

/** --- Main Component: RichEditor --- */
export const RichEditor = ({ value, onChange }: EditorProps) => {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
				codeBlock: false,
			}),
			CodeBlockLowlight.configure({ lowlight }),
			CharacterCount,
			Image.configure({
				HTMLAttributes: {
					class:
						"rounded-2xl border border-border max-w-full my-8 shadow-lg block mx-auto",
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class:
						"text-primary underline underline-offset-4 font-semibold cursor-pointer",
				},
			}),
			Placeholder.configure({
				placeholder: "Tell your story...",
			}),
		],
		content: value,
		editorProps: {
			attributes: {
				class:
					"prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[450px] p-8",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) return null;

	return (
		<div className='relative border rounded-2xl overflow-hidden bg-background shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all'>
			<MenuBar editor={editor} />

			<div className='bg-white dark:bg-zinc-950'>
				<EditorContent editor={editor} />
			</div>

			<div className='px-4 py-2 border-t bg-muted/20 flex justify-between items-center'>
				<div className='flex gap-4'>
					<span className='text-[10px] text-muted-foreground uppercase font-bold tracking-tighter'>
						{editor.storage.characterCount.words()} Words
					</span>
				</div>
				<p className='text-[10px] text-muted-foreground uppercase font-bold tracking-widest'>
					{editor.storage.characterCount.characters()} Characters
				</p>
			</div>
		</div>
	);
};
