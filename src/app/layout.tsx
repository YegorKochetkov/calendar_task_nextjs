import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { CalendarHeader } from "@/components/calendar-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Calendar",
	description: "Calendar Test Task",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={inter.className}
				style={{
					display: "flex",
					flexDirection: "column",
					padding: "0.25rem",
				}}
			>
				<CalendarHeader />
				{children}
			</body>
		</html>
	);
}
