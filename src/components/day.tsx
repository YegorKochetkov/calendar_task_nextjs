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
		paddingInline: "0.5rem",
		paddingBlock: "0.25rem",
	}),

	dayCellHeader: css({
		display: "flex",
		flexDirection: "row",
		gap: "0.25rem",
	}),

	todayTime: css({
		backgroundColor: "blue",
		color: "white",
		borderRadius: "50%",
		padding: "0.25rem",
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
