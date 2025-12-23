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
		],
	},
};

export default nextConfig;
