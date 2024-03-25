/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { isFirstDayOfMonth, isLastDayOfMonth } from "@/lib/utils";

const styles = {
	dayCell: css({
		display: "flex",
		flexDirection: "column",
		borderInlineEnd: "1px solid lightgrey",
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		padding: "0.25rem",
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

	return (
		<div css={styles.dayCell}>
			<header css={styles.dayCellHeader}>
				<time css={isToday && styles.todayTime} dateTime={day.toDateString()}>
					{dayFormat.format(day)}
				</time>
			</header>
		</div>
	);
};
