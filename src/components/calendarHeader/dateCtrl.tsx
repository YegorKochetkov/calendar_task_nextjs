/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { SelectedDateCtx } from "@/context/selectedDateCtx";

const styles = {
	btn: css({
		"--icon-size": "1em",
	}),

	ctrlDate: css({
		display: "flex",
		gap: "0.25rem",
		"& > button:first-of-type": {
			marginInlineEnd: "1.5rem",
		},
	}),
};

export const DateCtrl = () => {
	const { date, updateDate } = React.useContext(SelectedDateCtx);
	const currentDate = new Date(date);

	const handleNextMonth = () => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		updateDate(currentDate.toISOString());
	};

	const handlePrevMonth = () => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		updateDate(currentDate.toISOString());
	};

	const handleGoToToday = () => {
		updateDate(new Date().toISOString());
	};

	return (
		<div css={styles.ctrlDate}>
			<button
				type="button"
				className="btn"
				title="Go to today"
				onClick={handleGoToToday}
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
				onClick={handleNextMonth}
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
				onClick={handlePrevMonth}
			>
				<span className="icon-up-open" />
				<span hidden aria-hidden="false">
					Previous month
				</span>
			</button>
		</div>
	);
};
