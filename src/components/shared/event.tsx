/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { showModal } from "@/stores/modalsStore";
import { updateSelectedDay } from "@/stores/selectedDayStore";
import {
  CalendarEvent,
  setSelectedCalendarEvent,
} from "@/stores/eventsStore";
import { setDraggingEventId } from "@/stores/dragNDropStateStore";

const styles = {
  event: css({
    flexShrink: 0,
    border: "2px solid var(--label-color)",
    borderRadius: "0.25rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingInlineStart: "0.25rem",
    textAlign: "left",
    cursor: "pointer",
  }),
};

export const Event = React.memo(
  ({ calendarEvent }: { calendarEvent: CalendarEvent }) => {
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
        css={styles.event}
        onClick={(ev) => handleEventClick(ev, calendarEvent)}
        onDragStart={(ev) => eventsDragStartHandler(ev)}
        onDragEnd={(ev) => eventsDragEndHandler(ev, calendarEvent.id)}
      >
        {calendarEvent.title}
      </li>

    );
  },
);

Event.displayName = "Event";
