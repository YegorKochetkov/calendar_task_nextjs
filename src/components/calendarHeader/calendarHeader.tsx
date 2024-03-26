/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { DateCtrl } from "./dateCtrl";
import { SelectedDate } from "./selectedDate";
import { ViewCtrl } from "./viewCtrl";

const styles = {
	header: css({
		"--icon-size": "2rem",
		display: "flex",
		alignItems: "center",
		gap: "1.25rem",
		padding: "0.5rem",
		paddingBlockEnd: "1rem",
		marginBlockEnd: "0.5rem",
		"& button": {
			height: "2rem",
		},
		borderBlockEnd: "1px solid lightgrey",
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
			<SelectedDate />
			<ViewCtrl />
		</header>
	);
};
