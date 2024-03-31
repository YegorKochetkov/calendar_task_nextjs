/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { MonthGridHeader } from "./monthGridHeader";
import { MonthGridCells } from "./monthGridCells";
import { fetchHoliday } from "@/lib/fetchHolidays";
import { createExampleEvents } from "@/lib/utils";
import { $calendarEvents, setCalendarEvents } from "@/stores/eventsStore";

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

  const events = useStore($calendarEvents)
  // FOR EXAMPLE ONLY
  React.useEffect(() => {
    if (events.length > 0) return

    const exampleEvents = createExampleEvents();
    setCalendarEvents(exampleEvents)
  }, [ events ]);

  return (
    <section css={styles.monthSection}>
      <MonthGridHeader />
      <MonthGridCells />
    </section>
  );
};
