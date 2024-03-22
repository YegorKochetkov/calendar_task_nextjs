/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

export const Sidebar = () => {
	const styles = {
		sidebar: css({
			paddingInline: "0.5rem",
		}),
	};

	return <aside css={styles.sidebar}>Sidebar</aside>;
};
