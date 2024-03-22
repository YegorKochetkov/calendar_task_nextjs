/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const styles = {
	sidebar: css({
		paddingInline: "0.5rem",
	}),
};

export const Sidebar = () => {
	return <aside css={styles.sidebar}>Sidebar</aside>;
};
