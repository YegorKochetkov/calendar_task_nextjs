/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const styles = {
	view: css({
		display: "flex",
		gap: "0.5rem",
	}),
};

export const ViewCtrl = () => {
	return (
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
	);
};
