/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";

const styles = {
	header: css({
		"--icon-size": "2rem",
		display: "flex",
		alignItems: "center",
		gap: "1.25rem",
		padding: "0.5rem",
		marginBlockEnd: "0.5rem",
		"& button": {
			height: "2rem",
		},
	}),

	date: css({
		marginInline: "auto",
	}),

	btn: css({
		"--icon-size": "1em",
	}),

	view: css({
		display: "flex",
		gap: "0.25rem",
	}),

	ctrlMonth: css({
		display: "flex",
		gap: "0.25rem",
		"& > button:first-of-type": {
			marginInlineEnd: "1.5rem",
		},
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
			<span className="icon-calendar" />
			<div css={styles.ctrlMonth}>
				<button type="button" className="btn" title="Go to today">
					Today
					<span hidden aria-hidden="false">
						view
					</span>
				</button>
				<button
					type="button"
					className="btn"
					css={styles.btn}
					title="Next month"
				>
					<span className="icon-down-open" />
					<span hidden aria-hidden="false">
						Next month
					</span>
				</button>
				<button
					type="button"
					className="btn"
					css={styles.btn}
					title="Previous month"
				>
					<span className="icon-up-open" />
					<span hidden aria-hidden="false">
						Previous month
					</span>
				</button>
			</div>
			<time dateTime={new Date().toDateString()} css={styles.date}>
				{intlToday}
			</time>
			<div css={styles.view}>
				<button type="button" className="btn" title="Week view">
					Week{" "}
					<span hidden aria-hidden="false">
						view
					</span>
				</button>
				<button type="button" className="btn" title="Month view">
					Month{" "}
					<span hidden aria-hidden="false">
						view
					</span>
				</button>
			</div>
		</header>
	);
};
