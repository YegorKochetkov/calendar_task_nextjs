/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { $selectedDate, updateSelectedDate } from "@/stores/selectedDateStore";

const styles = {
	btn: css({
		"--icon-size": "1em",
	}),

	ctrlDate: css({
		display: "flex",
		gap: "0.5rem",
		"& > button:first-of-type": {
			marginInlineEnd: "1.5rem",
		},
	}),
};

export const DateCtrl = () => {
  const selectedDate = useStore($selectedDate);
	const currentDate = new Date(selectedDate);

	const nextMonthHandler = () => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		updateSelectedDate(currentDate.toDateString());
	};

	const prevMonthHandler = () => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		updateSelectedDate(currentDate.toDateString());
	};

	const resetToCurrentDateHandler = () => {
		updateSelectedDate(new Date().toDateString());
	};

	return (
		<div css={styles.ctrlDate}>
			<button
				type="button"
				className="btn"
				title="Go to today"
				onClick={resetToCurrentDateHandler}
			>
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
				onClick={nextMonthHandler}
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
				onClick={prevMonthHandler}
			>
				<span className="icon-up-open" />
				<span hidden aria-hidden="false">
					Previous month
				</span>
			</button>
		</div>
	);
};
