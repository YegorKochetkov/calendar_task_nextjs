/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { Day } from "../day";

import { calendarColumns, getMonthGrid } from "@/lib/utils";
import { SelectedDateCtx } from "@/context/selectedDateCtx";

const styles = {
	weekRow: css({
		display: "grid",
		flex: "1 1 0%",
		gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr))`,
		borderBlockEnd: "1px solid lightgrey",
		borderInlineStart: "1px solid lightgrey",
	}),

	firstWeekRow: css({
		borderBlockStart: "1px solid lightgrey",
	}),
};

export const MonthGridCells = () => {
	const { date } = React.useContext(SelectedDateCtx);
	const monthGrid = getMonthGrid(date);

	return (
		<>
			{monthGrid.map((weekRow, weekIndex) => (
				<React.Fragment key={weekIndex}>
					<div css={[styles.weekRow, weekIndex === 0 && styles.firstWeekRow]}>
						{weekRow.map((day, dayIndex) => (
							<Day key={dayIndex} day={day} />
						))}
					</div>
				</React.Fragment>
			))}
		</>
	);
};
