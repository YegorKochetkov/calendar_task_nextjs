/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { MonthGridHeader } from "./monthGridHeader";
import { MonthGridCells } from "./monthGridCells";
import { fetchHoliday } from "@/lib/fetchHolidays";

const styles = {
  monthSection: css({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%",
  }),
};

export const MonthGrid = () => {
  React.useEffect(() => {
    fetchHoliday();
  }, []);

  return (
    <section css={styles.monthSection}>
      <MonthGridHeader />
      <MonthGridCells />
    </section>
  );
};
