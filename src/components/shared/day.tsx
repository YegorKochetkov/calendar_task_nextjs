/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { isFirstDayOfMonth, isLastDayOfMonth } from "@/lib/utils";
import { updateSelectedDay } from "@/stores/selectedDayStore";
import { showModal } from "@/stores/modalsStore";

import { EventsList } from "./eventsList";
import { HolidayList } from "./holidaysList";
import { updateCalendarEventDate } from "@/stores/eventsStore";
import {
  getDraggingEventId,
  getDraggingEventNextDate,
  setDraggingEventId,
  setDraggingEventNextDate,
} from "@/stores/dragNDropStateStore";

const styles = {
  dayCell: css({
    display: "flex",
    flexDirection: "column",
    border: "unset",
    borderInlineEnd: "1px solid lightgrey",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    padding: "0.25rem",
    overflow: "hidden",
    height: "100%",
    width: "100%",
  }),

  dayCellDimmed: css({
    backgroundColor: "transparent",
  }),

  selectedDay: css({
    boxShadow: "inset 0 0 0 2px lightgrey",
  }),

  dayCellHeader: css({
    display: "flex",
    flexDirection: "row",
    gap: "0.25rem",
  }),

  time: css({
    display: "flex",
    alignItems: "center",
    width: "min-content",
    "& span": {
      marginInlineEnd: "0.5rem",
    },
  }),

  todayTime: css({
    display: "grid",
    placeItems: "center",
    width: "1.5rem",
    aspectRatio: "1/1",
    color: "white",
    backgroundColor: "blue",
    borderRadius: "50%",
  }),

  eventsLists: css({
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: "0.25rem",
    margin: 0,
    paddingBlockEnd: "1.75rem",
    listStyle: "none",
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  }),
};

export const Day = React.memo(
  ({
    currentDay,
    isToday,
    isSelectedDay,
    isCurrentMonth,
  }: {
    currentDay: string;
    isToday: boolean;
    isSelectedDay: boolean;
    isCurrentMonth: boolean;
  }) => {
    const locale = useLocale();
    const dayFormatDigits = new Intl.DateTimeFormat(locale, {
      day: "numeric",
    });
    const dayFormatName = new Intl.DateTimeFormat(locale, {
      month: "short",
    });

    const currentDayObj = new Date(currentDay);

    const showDayName =
      isFirstDayOfMonth(currentDayObj) || isLastDayOfMonth(currentDayObj);

    const intlCurrentDayName = dayFormatName.format(currentDayObj);
    const intlCurrentDayDigits = dayFormatDigits.format(currentDayObj);

    const addEventModalHandler = () => {
      updateSelectedDay(currentDay);
      showModal("addEventModal");
    };

    const dayDragOverHandler = (ev: React.DragEvent<HTMLButtonElement>) => {
      ev.preventDefault();
      const dayDate = ev.currentTarget.getAttribute("data-day-date");
      const draggingEvent = document.querySelector(".dragging");
      const eventId = draggingEvent?.getAttribute("data-event-id");

      draggingEventRef.current = draggingEvent;
      eventId && setDraggingEventId(eventId);
      dayDate && setDraggingEventNextDate(dayDate);
    };

    const currentEventsListRef = React.useRef<Element | null>(null);
    const draggingEventRef = React.useRef<Element | null>(null);

    const dayDragStartCaptureHandler = (
      ev: React.DragEvent<HTMLButtonElement>,
    ) => {
      currentEventsListRef.current =
        ev.currentTarget.querySelector("[data-events-list]");
    };

    const dayDragEndCaptureHandler = (
      ev: React.DragEvent<HTMLButtonElement>,
    ) => {
      const draggingEventId = getDraggingEventId();
      const draggingEventNextDate = getDraggingEventNextDate();

      draggingEventId &&
        draggingEventNextDate &&
        updateCalendarEventDate(draggingEventId, draggingEventNextDate);
    };

    React.useEffect(() => {
      return () => { };
    }, []);

    return (
      <button
        type="button"
        data-day-date={currentDay}
        css={[
          styles.dayCell,
          !isCurrentMonth && styles.dayCellDimmed,
          isSelectedDay && styles.selectedDay,
        ]}
        onClick={addEventModalHandler}
        onDragOver={(ev) => dayDragOverHandler(ev)}
        onDragStartCapture={(ev) => dayDragStartCaptureHandler(ev)}
        onDragEndCapture={(ev) => dayDragEndCaptureHandler(ev)}
      >
        <span hidden aria-hidden="false">
          Add calendar event
        </span>
        <div css={styles.dayCellHeader}>
          <time css={styles.time} dateTime={currentDay}>
            {showDayName && <span>{intlCurrentDayName}</span>}
            <span css={isToday && styles.todayTime}>
              {intlCurrentDayDigits}
            </span>
          </time>
        </div>
        <div css={styles.eventsLists}>
          <HolidayList currentDay={currentDay} />
          <EventsList currentDay={currentDay} />
        </div>
      </button>
    );
  },
);

Day.displayName = "Day";
