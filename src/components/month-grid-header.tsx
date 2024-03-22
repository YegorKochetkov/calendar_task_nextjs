/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { calendarColumns, getWeekDaysName } from "@/lib/utils";

export const MonthGridHeader = ({ rowIndex }: { rowIndex: number }) => {
	const locale = useLocale();
	const weekDays = getWeekDaysName(locale, "short");

	const styles = {
		monthGridHeader: css({
			display: "grid",
			justifyItems: "center",
			gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr))`,
			marginBlockEnd: "0.5rem",
		}),
	};

	return rowIndex === 0 ? (
		<header css={styles.monthGridHeader}>
			{weekDays.map((day, index) => (
				<p key={index}>{day}</p>
			))}
		</header>
	) : null;
};
