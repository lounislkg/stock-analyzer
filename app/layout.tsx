"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Nav from "@/components/nav";
import SearchCompany from "@/components/SearchCompany";
import BasicInfos from "@/components/BasicInfos";
import styles from "./layout.module.css";
const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<QueryClientProvider client={queryClient}>
					<header className={styles.header}>
						<SearchCompany />
						<Nav />
					</header>
					<BasicInfos />
					{children}
				</QueryClientProvider>
			</body>
		</html>
	);
}
