/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { calendarColumns, getWeekDaysName } from "@/lib/utils";

const styles = {
	monthGridHeader: css({
		display: "grid",
		justifyItems: "center",
		gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr))`,
		height: "1.5rem",
	}),
};

export const MonthGridHeader = () => {
	const locale = useLocale();
	const weekDays = getWeekDaysName(locale, "short");

	return (
		<header css={styles.monthGridHeader}>
			{weekDays.map((day, index) => (
				<p key={index}>{day}</p>
			))}
		</header>
	);
};
