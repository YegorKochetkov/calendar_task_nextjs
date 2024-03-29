/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { Day } from "../day";

import { calendarColumns, getMonthGrid } from "@/lib/utils";
import { $selectedDay } from "@/stores/selectedDayStore";
import { $selectedDate } from "@/stores/selectedDateStore";

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
	const selectedDate = useStore($selectedDate);
	const selectedDay = useStore($selectedDay);
	const monthGrid = React.useMemo(
		() => getMonthGrid(selectedDate),
		[selectedDate],
	);

	return (
		<>
			{monthGrid.map((weekRow, weekIndex) => (
				<React.Fragment key={weekIndex}>
					<div css={[styles.weekRow, weekIndex === 0 && styles.firstWeekRow]}>
						{weekRow.map((currentDay, dayIndex) => (
							<Day
								key={dayIndex}
								currentDay={currentDay.toDateString()}
								isToday={
									currentDay.toDateString() === new Date().toDateString()
								}
								isCurrentMonth={
									new Date(selectedDate).getMonth() ===
									new Date(currentDay).getMonth()
								}
								isSelectedDay={currentDay.toDateString() === selectedDay}
							/>
						))}
					</div>
				</React.Fragment>
			))}
		</>
	);
};
