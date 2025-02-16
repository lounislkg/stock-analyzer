import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static2.finnhub.io",
				port: "",
				pathname: "/file/publicdatany/finnhubimage/stock_logo/**",
				search: "",
			},
		], // Ajoute le domaine externe ici
		formats: ["image/avif", "image/webp"], // Active WebP et AVIF pour optimisation
	},
};

export default nextConfig;
