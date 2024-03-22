/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";

const styles = {
	header: css({
		padding: "0.5rem",
	}),
};

export const CalendarHeader = () => {
	const locale = useLocale();
	const intlToday = new Intl.DateTimeFormat(locale, {
		month: "long",
		year: "numeric",
	}).format(new Date());

	return (
		<header css={styles.header}>
			<h1 hidden aria-hidden="false">
				Calendar
			</h1>
			<time dateTime={new Date().toDateString()}>{intlToday}</time>
		</header>
	);
};
