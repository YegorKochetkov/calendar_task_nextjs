/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { Sidebar } from "@/components/shared/sidebar";
import { MonthGrid } from "@/components/monthGrid/monthGrid";

const styles = {
  main: css({
    display: "flex",
    flexDirection: "row",
    flex: "1 1 0%",
    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  }),
};

export default function Home() {
  return (
    <main css={styles.main}>
      <Sidebar />
      <MonthGrid />
    </main>
  );
}
