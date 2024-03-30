/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { AddEventButton } from "./addEventButton";

const styles = {
  sidebar: css({
    display: "flex",
    flexDirection: "column",
    paddingBlock: "1rem",
    paddingInline: "1.5rem",
    marginBlockStart: "1.5rem",
    borderBlock: "1px solid lightgrey",
    borderInlineStart: "1px solid lightgrey",
    "@media (max-width: 600px)": {
      border: "none",
      marginBlockStart: "0",
    },
  }),
};

export const Sidebar = () => {
  return (
    <aside css={styles.sidebar}>
      <AddEventButton />
    </aside>
  );
};
