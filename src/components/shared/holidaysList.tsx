/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { $holidays } from "@/stores/holidaysStore";

type Holiday = {
  date: string;
  name: string;
};

const styles = {
  holidaysList: css({
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
      border: "2px solid lightgrey",
      borderRadius: "0.25rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingInlineStart: "0.25rem",
      textAlign: "left",
    },
  }),
};

export const HolidayList = ({ currentDay }: { currentDay: string }) => {
  const holidays = useStore($holidays)
  const holidaysName = new Set();
  const uniqueHolidays: Holiday[] = [];

  holidays.forEach((holiday) => {
    const isCurrentDayHoliday =
      new Date(holiday.date).toDateString() === new Date(currentDay).toDateString();

    if (holidaysName.has(holiday.name) || !isCurrentDayHoliday) return;

    holidaysName.add(holiday.name);

    uniqueHolidays.push(holiday);
  });

  return (
    <ul css={styles.holidaysList}>
      {uniqueHolidays.map((holiday) => (
        <li key={holiday?.name}>{holiday?.name}</li>
      ))}
    </ul>
  );
};
