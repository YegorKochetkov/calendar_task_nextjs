/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { css } from "@emotion/react";

import {
  $calendarEvents,
  $calendarEventsLabelFilter,
  $calendarEventsQueryFilter,
  CalendarEvent,
  setSelectedCalendarEvent,
} from "@/stores/eventsStore";
import { showModal } from "@/stores/modalsStore";
import { updateSelectedDay } from "@/stores/selectedDayStore";

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
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& li": {
      flexShrink: 0,
      border: "2px solid var(--label-color)",
      borderRadius: "0.25rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingInlineStart: "0.25rem",
      textAlign: "left",
      cursor: "pointer",
    },
  }),
};

export const EventsList = React.memo(
  ({ currentDay }: { currentDay: string }) => {
    const calendarEventsQueryFilter = useStore($calendarEventsQueryFilter);
    const calendarEventsLabelFilter = useStore($calendarEventsLabelFilter);
    const calendarEvents = useStore($calendarEvents);

    const events = React.useMemo(
      () =>
        calendarEvents.filter((event) => {
          const dateFilter = new Date(event.date).toDateString() === currentDay;
          const queryFilter = event.title
            .toLocaleLowerCase()
            .includes(calendarEventsQueryFilter.toLocaleLowerCase());
          const labelFilter = calendarEventsLabelFilter
            ? event.labelColor === calendarEventsLabelFilter
            : true;

          return dateFilter && queryFilter && labelFilter;
        }),
      [
        calendarEvents,
        calendarEventsLabelFilter,
        calendarEventsQueryFilter,
        currentDay,
      ],
    );

    const handleEventClick = (
      ev: React.MouseEvent<HTMLLIElement, MouseEvent>,
      calendarEvent: CalendarEvent,
    ) => {
      ev.stopPropagation();
      setSelectedCalendarEvent(calendarEvent);
      updateSelectedDay(calendarEvent.date);
      showModal("addEventModal");
    };

    return (
      <ul css={styles.eventsList}>
        {events.map((calendarEvent) => (
          <li
            key={calendarEvent.id}
            style={
              {
                "--label-color": calendarEvent.labelColor,
              } as React.CSSProperties
            }
            onClick={(ev) => handleEventClick(ev, calendarEvent)}
          >
            {calendarEvent.title}
          </li>
        ))}
      </ul>
    );
  },
);

EventsList.displayName = "EventsList";
