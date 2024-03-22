import type React from "react";

import { useLocale } from "@/hooks/useLocale";
import { isFirstDayOfMonth, isLastDayOfMonth } from "@/lib/utils";

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

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid lightgrey",
				fontSize: "0.875rem",
				lineHeight: "1.25rem",
				paddingInline: "0.5rem",
				paddingBlock: "0.25rem",
			}}
		>
			<header
				style={{
					display: "flex",
					flexDirection: "row",
					gap: "0.25rem",
				}}
			>
				<time dateTime={day.toDateString()}>{dayFormat.format(day)}</time>
			</header>
		</div>
	);
};
