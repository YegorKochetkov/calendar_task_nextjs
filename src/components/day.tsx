/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { isFirstDayOfMonth, isLastDayOfMonth } from "@/lib/utils";
import { SelectedDateCtx } from "@/context/selectedDateCtx";

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

export const Day = ({ day }: { day: Date }) => {
	const locale = useLocale();
	const dayFormatDigits = new Intl.DateTimeFormat(locale, {
		day: "numeric",
	});
	const dayFormatNameDigits = new Intl.DateTimeFormat(locale, {
		month: "short",
		day: "numeric",
	});

	let dayFormat = dayFormatDigits;

	if (isFirstDayOfMonth(day) || isLastDayOfMonth(day)) {
		dayFormat = dayFormatNameDigits;
	}

	const isToday = new Date().toDateString() === day.toDateString();

	const { date: newDate } = React.useContext(SelectedDateCtx);
	const selectedMonth = new Date(newDate).getMonth();
	const isCurrentMonth = day.getMonth() === selectedMonth;

	return (
		<button
			type="button"
			css={[styles.dayCell, !isCurrentMonth && styles.dayCellDimmed]}
		>
			<span hidden aria-hidden="false">
				Add calendar event
			</span>
			<div css={styles.dayCellHeader}>
				<time css={isToday && styles.todayTime} dateTime={day.toDateString()}>
					{dayFormat.format(day)}
				</time>
			</div>
		</button>
	);
};
