/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io", // This is the UploadThing storage domain
				port: "",
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			// If you plan to use GitHub auth later, add this too:
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
