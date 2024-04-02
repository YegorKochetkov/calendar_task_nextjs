/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { css } from "@emotion/react";

import {
  $calendarEvents,
  $calendarEventsLabelFilter,
  $calendarEventsQueryFilter,
} from "@/stores/eventsStore";
import { Event } from "./event";

const styles = {
  eventsList: css({
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "0.25rem",
    margin: 0,
    listStyle: "none",
    width: "100%",
    overflowY: "scroll",
    "-ms-overflow-style": "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }),
};

export const EventsList = React.memo(
  ({ currentDay }: { currentDay: string }) => {
    const calendarEventsQueryFilter = useStore($calendarEventsQueryFilter);
    const calendarEventsLabelFilter = useStore($calendarEventsLabelFilter);
    const calendarEvents = useStore($calendarEvents);

    const filteredEventsForCurrentDay = React.useMemo(() => {
      return calendarEvents?.filter((event) => {
        const dateFilter =
          new Date(event.date).toDateString() ===
          new Date(currentDay).toDateString();
        const queryFilter = event.title
          .toLocaleLowerCase()
          .includes(calendarEventsQueryFilter.toLocaleLowerCase());
        const labelFilter = calendarEventsLabelFilter
          ? event.labelColor === calendarEventsLabelFilter
          : true;

        return dateFilter && queryFilter && labelFilter;
      });
    }, [
      calendarEvents,
      calendarEventsLabelFilter,
      calendarEventsQueryFilter,
      currentDay,
    ]);

    return (
      <ul css={styles.eventsList} data-events-list>
        {filteredEventsForCurrentDay?.map((calendarEvent) => (
          <Event key={calendarEvent.id} calendarEvent={calendarEvent} />
        ))}
      </ul>
    );
  },
);

EventsList.displayName = "EventsList";
