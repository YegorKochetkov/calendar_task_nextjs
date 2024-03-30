/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

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
      cursor: "pointer",
    },
  }),
};

export const HolidayList = ({ currentDay }: { currentDay: string }) => {
  const [ holidays, setHolidays ] = React.useState<Holiday[]>([]);
  const holidaysName = new Set();
  const uniqueHolidays: Holiday[] = [];

  holidays.forEach((holiday) => {
    const isCurrentDayHoliday =
      new Date(holiday.date).toDateString() === currentDay;

    if (holidaysName.has(holiday.name) || !isCurrentDayHoliday) return;

    holidaysName.add(holiday.name);

    uniqueHolidays.push(holiday);
  });

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = "https://date.nager.at/api/v3/NextPublicHolidaysWorldwide";

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }

        const data = (await response.json()) as Holiday[];

        setHolidays(data);
      } catch (error: any) {
        if ("name" in error && error.name === "AbortError") {
          console.debug("Fetch holidays abort");
        }

        if ("message" in error) {
          console.debug("Fetch holidays error: ", error.message);
        }

        console.debug("Fetch holidays error", error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <ul css={styles.holidaysList}>
      {uniqueHolidays.map((holiday) => (
        <li key={holiday?.name}>{holiday?.name}</li>
      ))}
    </ul>
  );
};
