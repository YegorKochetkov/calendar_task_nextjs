import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const myFont = localFont({
	src: "../fonts/fontello.woff2",
	display: "swap",
});

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
			<body className={`${inter.className} ${myFont.className}`}>
				<CalendarHeader />
				{children}
			</body>
		</html>
	);
}
