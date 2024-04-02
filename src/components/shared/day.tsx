/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { useLocale } from "@/hooks/useLocale";
import { isFirstDayOfMonth, isLastDayOfMonth } from "@/lib/utils";
import { updateSelectedDay } from "@/stores/selectedDayStore";
import { showModal } from "@/stores/modalsStore";

import { EventsList } from "./eventsList";
import { HolidayList } from "./holidaysList";
import { setDayFromDragStart } from "@/stores/dragNDropStateStore";

const styles = {
  dayCell: css({
    display: "flex",
    flexDirection: "column",
    border: "unset",
    borderInlineEnd: "1px solid lightgrey",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    padding: "0.25rem",
    paddingBlockEnd: "0",
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

    const dayDragStartCaptureHandler = () => {
      setDayFromDragStart(currentDay);
    }

    return (
      <button
        type="button"
        data-day
        data-day-date={currentDay}
        css={[
          styles.dayCell,
          !isCurrentMonth && styles.dayCellDimmed,
          isSelectedDay && styles.selectedDay,
        ]}
        onClick={addEventModalHandler}
        onDragStartCapture={dayDragStartCaptureHandler}
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
