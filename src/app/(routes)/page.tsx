/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { Sidebar } from "@/components/sidebar";
import { MonthGrid } from "@/components/monthGrid/monthGrid";

const styles = {
	main: css({
		display: "flex",
		flex: "1 1 0%",
	}),
};

export default function Home() {
	return (
		<main css={styles.main}>
			<Sidebar />
			<MonthGrid />
		</main>
	);
}
