/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { MonthGridHeader } from "./monthGridHeader";
import { MonthGridCells } from "./monthGridCells";
import { fetchHoliday } from "@/lib/fetchHolidays";
import { createExampleEvents, getDragAfterElement } from "@/lib/utils";
import { $calendarEvents, setCalendarEvents } from "@/stores/eventsStore";

const styles = {
  monthSection: css({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%",
  }),
};

export const MonthGrid = () => {
  React.useEffect(() => {
    fetchHoliday();
  }, []);

  const events = useStore($calendarEvents);
  // FOR EXAMPLE ONLY
  React.useEffect(() => {
    if (events.length > 0) return;

    const exampleEvents = createExampleEvents();
    setCalendarEvents(exampleEvents);
  }, [ events ]);

  React.useEffect(() => {
    const events = document.querySelectorAll("[data-event]");
    const dayCells = document.querySelectorAll("[data-day]");

    events.forEach((draggable_event) => {
      draggable_event.addEventListener("dragstart", () => {
        draggable_event.classList.add("dragging");
      });

      draggable_event.addEventListener("dragend", () => {
        draggable_event.classList.remove("dragging");
      });
    });

    dayCells.forEach((dayCell) => {
      dayCell.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        const eventsLists = dayCell.querySelector("[data-events-list]");
        const afterElement = getDragAfterElement(eventsLists!, ev.clientY);
        const draggable = document.querySelector(".dragging");

        if (afterElement === null && draggable) {
          eventsLists?.appendChild(draggable);
        } else if (draggable) {
          eventsLists?.insertBefore(draggable, afterElement);
        }
      });
    });
  }, []);

  return (
    <section css={styles.monthSection}>
      <MonthGridHeader />
      <MonthGridCells />
    </section>
  );
};
