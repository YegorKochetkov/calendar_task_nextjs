import React from "react";

import { Day } from "./day";

import { calendarColumns, calendarRows } from "@/lib/utils";

export const MonthGrid = ({ monthGrid }: { monthGrid: Date[][] }) => {
	return (
		<div
			style={{
				display: "grid",
				flex: "1 1 0%",
				gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr));`,
				gridTemplateRows: `repeat(${calendarRows}, minmax(0, 1fr));`,
			}}
		>
			{monthGrid.map((week, weekIndex) => (
				<React.Fragment key={weekIndex}>
					{week.map((day, dayIndex) => (
						<Day key={dayIndex} day={day} />
					))}
				</React.Fragment>
			))}
		</div>
	);
};
