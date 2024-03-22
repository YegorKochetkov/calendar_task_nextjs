/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { Sidebar } from "@/components/sidebar";
import { MonthGrid } from "@/components/month-grid";

import { getMonthGrid } from "@/lib/utils";

export default function Home() {
	const [currentMonthGrid, setCurrentMonthGrid] = React.useState(
		getMonthGrid(),
	);

	const styles = {
		main: css({
			display: "flex",
			flex: "1 1 0%",
		}),
	};

	return (
		<main css={styles.main}>
			<Sidebar />
			<MonthGrid monthGrid={currentMonthGrid} />
		</main>
	);
}
