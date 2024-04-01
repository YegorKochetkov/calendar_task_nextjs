/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { useStore } from "@nanostores/react";
import { css } from "@emotion/react";

import { showModal } from "@/stores/modalsStore";
import { updateSelectedDay } from "@/stores/selectedDayStore";
import {
  $calendarEvents,
  $calendarEventsLabelFilter,
  $calendarEventsQueryFilter,
  CalendarEvent,
  setSelectedCalendarEvent,
} from "@/stores/eventsStore";
import { setDraggingEventId } from "@/stores/dragNDropStateStore";

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

    const eventsForCurrentDay = React.useMemo(() => {
      for (let dayDate in calendarEvents) {
        if (
          new Date(dayDate).toDateString() ===
          new Date(currentDay).toDateString()
        ) {
          return calendarEvents[ dayDate ];
        }
      }
    }, [ calendarEvents, currentDay ]);

    const filteredEventsForCurrentDay = React.useMemo(() => {
      return eventsForCurrentDay?.filter((event) => {
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
      calendarEventsLabelFilter,
      calendarEventsQueryFilter,
      currentDay,
      eventsForCurrentDay,
    ]);

    const handleEventClick = (
      ev: React.MouseEvent<HTMLLIElement, MouseEvent>,
      calendarEvent: CalendarEvent,
    ) => {
      ev.stopPropagation();
      setSelectedCalendarEvent(calendarEvent);
      updateSelectedDay(calendarEvent.date);
      showModal("addEventModal");
    };

    const eventsDragStartHandler = (event: React.DragEvent<HTMLLIElement>) => {
      event.currentTarget.classList.add("dragging");
    };

    const eventsDragEndHandler = (
      event: React.DragEvent<HTMLLIElement>,
      calendarEventId: string,
    ) => {
      setDraggingEventId(calendarEventId);
      event.currentTarget.classList.remove("dragging");
    };

    return (
      <ul css={styles.eventsList} data-events-list>
        {filteredEventsForCurrentDay?.map((calendarEvent) => (
          <li
            key={calendarEvent.id}
            draggable="true"
            data-event
            data-event-id={calendarEvent.id}
            style={
              {
                "--label-color": calendarEvent.labelColor,
              } as React.CSSProperties
            }
            onClick={(ev) => handleEventClick(ev, calendarEvent)}
            onDragStart={(ev) => eventsDragStartHandler(ev)}
            onDragEnd={(ev) => eventsDragEndHandler(ev, calendarEvent.id)}
          >
            {calendarEvent.title}
          </li>
        ))}
      </ul>
    );
  },
);

EventsList.displayName = "EventsList";
