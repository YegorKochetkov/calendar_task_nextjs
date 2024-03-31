/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { Day } from "../shared/day";

import { calendarColumns, calendarRows, getMonthGrid } from "@/lib/utils";
import { $selectedDay } from "@/stores/selectedDayStore";
import { $selectedDate } from "@/stores/selectedDateStore";

const styles = {
  weekRow: css({
    display: "grid",
    flex: "1 1 0%",
    maxHeight: `calc(99% / ${calendarRows})`,
    gridTemplateColumns: `repeat(${calendarColumns}, minmax(0, 1fr))`,
    borderBlockEnd: "1px solid lightgrey",
    borderInlineStart: "1px solid lightgrey",
    height: "100%",
    overflow: "hidden",
  }),

  firstWeekRow: css({
    borderBlockStart: "1px solid lightgrey",
  }),
};

export const MonthGridCells = () => {
  const selectedDate = useStore($selectedDate);
  const monthGrid = React.useMemo(
    () => getMonthGrid(selectedDate),
    [ selectedDate ],
  );

  const selectedDay = useStore($selectedDay);

  return (
    <>
      {monthGrid.map((weekRow, weekIndex) => (
        <React.Fragment key={weekIndex}>
          <div css={[ styles.weekRow, weekIndex === 0 && styles.firstWeekRow ]}>
            {weekRow.map((currentDay, dayIndex) => (
              <Day
                key={dayIndex}
                currentDay={currentDay.toISOString()}
                isToday={
                  currentDay.toDateString() === new Date().toDateString()
                }
                isCurrentMonth={
                  new Date(selectedDate).getMonth() ===
                  new Date(currentDay).getMonth()
                }
                isSelectedDay={
                  currentDay.toDateString() ===
                  new Date(selectedDay).toDateString()
                }
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
