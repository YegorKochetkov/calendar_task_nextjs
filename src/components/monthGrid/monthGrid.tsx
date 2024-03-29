/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { MonthGridHeader } from "./monthGridHeader";
import { MonthGridCells } from "./monthGridCells";

import { calendarColumns } from "@/lib/utils";

const styles = {
	monthSection: css({
		display: "flex",
		flexDirection: "column",
		flex: "1 1 0%",
	}),

	monthGrid: css({
		display: "grid",
		flex: "1 1 0%",
		gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr))`,
	}),
};

export const MonthGrid = () => {
	return (
		<section css={styles.monthSection}>
			<MonthGridHeader />
			<MonthGridCells />
		</section>
	);
};
