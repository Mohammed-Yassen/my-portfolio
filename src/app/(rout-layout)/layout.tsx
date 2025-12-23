/** @format */

import { FloatingDock } from "@/components/floating-nav";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			{/* <Navbar /> */}
			<FloatingDock />
			<main>{children}</main>
		</div>
	);
}
