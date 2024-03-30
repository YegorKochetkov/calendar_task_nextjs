/** @jsxImportSource @emotion/react */
import React from 'react'
import { useStore } from '@nanostores/react';
import { css } from '@emotion/react';

import { $calendarEvents, CalendarEvent, setSelectedCalendarEvent } from '@/stores/eventsStore';
import { showModal } from '@/stores/modalsStore';
import { updateSelectedDay } from '@/stores/selectedDayStore';

const styles = {
  eventsList: css({
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "0.25rem",
    margin: 0,
    paddingBlockEnd: "1.5rem",
    listStyle: "none",
    height: "100%",
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

export const EventsList = React.memo(({ currentDay }: { currentDay: string }) => {
  const calendarEvents = useStore($calendarEvents);
  const events = calendarEvents.filter(
    (event) => new Date(event.date).toDateString() === currentDay,
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
  )
});

EventsList.displayName = "EventsList";
