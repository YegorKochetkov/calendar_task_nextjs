/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { Day } from "../day";

import { calendarColumns, getMonthGrid } from "@/lib/utils";
import { SelectedDateCtx } from "@/context/selectedDateCtx";

const styles = {
	monthGrid: css({
		display: "grid",
		flex: "1 1 0%",
		gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr))`,
	}),
};

export const MonthGridCells = () => {
	const { date } = React.useContext(SelectedDateCtx);
	const monthGrid = getMonthGrid(date);

	return (
		<>
			{monthGrid.map((week, weekIndex) => (
				<React.Fragment key={weekIndex}>
					<div css={styles.monthGrid}>
						{week.map((day, dayIndex) => (
							<Day key={dayIndex} day={day} />
						))}
					</div>
				</React.Fragment>
			))}
		</>
	);
};
