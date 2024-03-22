/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { Day } from "./day";
import { MonthGridHeader } from "./month-grid-header";

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

export const MonthGrid = ({ monthGrid }: { monthGrid: Date[][] }) => {
	return (
		<section css={styles.monthSection}>
			{monthGrid.map((week, weekIndex) => (
				<React.Fragment key={weekIndex}>
					<MonthGridHeader rowIndex={weekIndex} />
					<div css={styles.monthGrid}>
						{week.map((day, dayIndex) => (
							<Day key={dayIndex} day={day} />
						))}
					</div>
				</React.Fragment>
			))}
		</section>
	);
};
