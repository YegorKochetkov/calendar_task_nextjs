/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { DateCtrl } from "./dateCtrl";
import { SelectedDate } from "../shared/selectedDate";
import { ViewCtrl } from "./viewCtrl";

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
};

export const CalendarHeader = () => {
	return (
		<header css={styles.header}>
			<h1 hidden aria-hidden="false">
				Calendar
			</h1>
			<span className="icon-calendar" />
			<DateCtrl />
			<SelectedDate formatter={{ month: "long", year: "numeric" }} />
			<ViewCtrl />
		</header>
	);
};
