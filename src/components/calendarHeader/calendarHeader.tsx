/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { DateCtrl } from "./dateCtrl";
import { ViewCtrl } from "./viewCtrl";
import { SelectedDate } from "../shared/selectedDate";

const styles = {
	header: css({
		"--icon-size": "2rem",
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: "1.75rem",
		padding: "1.5rem",
		paddingBlock: "1rem",
		"& button": {
			height: "2rem",
		},
		"@media (max-width: 600px)": {
			gap: "1rem",
		},
	}),

	date: css({
		marginInline: "auto",
	}),
};

export const CalendarHeader = () => {
	return (
		<header css={styles.header}>
			<h1 hidden aria-hidden="false">
				Calendar
			</h1>
			<span className="icon-calendar" />
			<DateCtrl />
			<span css={styles.date}>
				<SelectedDate formatter={{ month: "long", year: "numeric" }} />
			</span>
			<ViewCtrl />
		</header>
	);
};
