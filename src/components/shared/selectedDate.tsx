/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { SelectedDateCtx } from "@/context/selectedDateCtx";
import { useLocale } from "@/hooks/useLocale";

const styles = {
	date: css({
		marginInline: "auto",
	}),
};

export const SelectedDate = ({
	formatter,
}: Record<string, Intl.DateTimeFormatOptions>) => {
	const locale = useLocale();
	const { date } = React.useContext(SelectedDateCtx);
	const currentDate = new Date(date);
	const intlToday = new Intl.DateTimeFormat(locale, formatter).format(
		currentDate,
	);

	return (
		<time dateTime={new Date().toDateString()} css={styles.date}>
			{intlToday}
		</time>
	);
};
