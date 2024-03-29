/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { isFirstDayOfMonth, isLastDayOfMonth } from "@/lib/utils";
import { updateSelectedDay } from "@/stores/selectedDayStore";

const styles = {
	dayCell: css({
		display: "flex",
		flexDirection: "column",
		border: "unset",
		borderInlineEnd: "1px solid lightgrey",
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		padding: "0.25rem",
	}),

	dayCellDimmed: css({
		backgroundColor: "transparent",
	}),

	selectedDay: css({
		boxShadow: "inset 0 0 0 2px lightgrey",
	}),

	dayCellHeader: css({
		display: "flex",
		flexDirection: "row",
		gap: "0.25rem",
	}),

	todayTime: css({
		display: "grid",
		placeItems: "center",
		width: "1.5rem",
		aspectRatio: "1/1",
		color: "white",
		backgroundColor: "blue",
		borderRadius: "50%",
	}),
};

export const Day = React.memo(({
	currentDay,
	isToday,
	isSelectedDay,
  isCurrentMonth
}: {
	currentDay: string;
	isToday: boolean;
	isSelectedDay: boolean;
  isCurrentMonth: boolean
}) => {
	const locale = useLocale();
	const dayFormatDigits = new Intl.DateTimeFormat(locale, {
		day: "numeric",
	});
	const dayFormatNameDigits = new Intl.DateTimeFormat(locale, {
		month: "short",
		day: "numeric",
	});

	let dayFormat = dayFormatDigits;

	const currentDayObj = new Date(currentDay);
	if (isFirstDayOfMonth(currentDayObj) || isLastDayOfMonth(currentDayObj)) {
		dayFormat = dayFormatNameDigits;
	}

	return (
		<button
			type='button'
			css={[
				styles.dayCell,
				!isCurrentMonth && styles.dayCellDimmed,
				isSelectedDay && styles.selectedDay,
			]}
			onClick={() => updateSelectedDay(currentDay)}
		>
			<span hidden aria-hidden='false'>
				Add calendar event
			</span>
			<div css={styles.dayCellHeader}>
				<time css={isToday && styles.todayTime} dateTime={currentDay}>
					{dayFormat.format(currentDayObj)}
				</time>
			</div>
		</button>
	);
});

Day.displayName = "Day";
