"use client";
import React from "react";

import { Sidebar } from "@/components/sidebar";
import { MonthGrid } from "@/components/month-grid";

import { getMonthGrid } from "@/lib/utils";

export default function Home() {
	const [currentMonthGrid, setCurrentMonthGrid] = React.useState(
		getMonthGrid(),
	);

	return (
		<main
			style={{
				display: "flex",
				flex: "1 1 0%",
			}}
		>
			<Sidebar />
			<MonthGrid monthGrid={currentMonthGrid} />
		</main>
	);
}
