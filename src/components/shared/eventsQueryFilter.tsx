/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";
import { setCalendarEventsFilter } from "@/stores/eventsStore";

const styles = {
  filterInput: css({
    padding: "0.5rem",
    border: "1px solid lightgrey",
    borderRadius: "0.25rem",
  }),
};

export const EventsQueryFilter = () => {
  const [ query, setQuery ] = React.useState("");
  setCalendarEventsFilter(query);

  return (
    <input
      type="search"
      placeholder="Filter events"
      css={styles.filterInput}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
