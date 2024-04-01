/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { MonthGridHeader } from "./monthGridHeader";
import { MonthGridCells } from "./monthGridCells";
import { fetchHoliday } from "@/lib/fetchHolidays";
import { createExampleEvents, getDragAfterElement } from "@/lib/utils";
import { $calendarEvents, setCalendarEvents } from "@/stores/eventsStore";
import {
  setDraggingEventId,
  setDraggingEventNextDate,
} from "@/stores/dragNDropStateStore";

const styles = {
  monthSection: css({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 0%",
  }),
};

export const MonthGrid = () => {
  const savedEvents = useStore($calendarEvents);

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

    const eventsDragStartHandler = (event: Element) => {
      event.classList.add("dragging");
    };

    const eventsDragEndHandler = (event: Element) => {
      event.classList.remove("dragging");
      setDraggingEventId(event.getAttribute("data-event-id")!);
    };

    const dayCellDragOverHandler = (ev: Event, dayCell: Element) => {
      ev.preventDefault();
      const { clientY } = ev as MouseEvent;
      const eventsLists = dayCell.querySelector("[data-events-list]");
      const afterElement = getDragAfterElement(eventsLists!, clientY);
      const draggable = document.querySelector(".dragging");
      setDraggingEventNextDate(dayCell.getAttribute("data-day-date")!);

      if (afterElement === null && draggable) {
        eventsLists?.appendChild(draggable);
      } else if (draggable) {
        eventsLists?.insertBefore(draggable, afterElement);
      }
    };

    events.forEach((event) => {
      event.addEventListener("dragstart", () => eventsDragStartHandler(event));
      event.addEventListener("dragend", () => eventsDragEndHandler(event));
    });

    dayCells.forEach((dayCell) => {
      dayCell.addEventListener("dragover", (ev) =>
        dayCellDragOverHandler(ev, dayCell),
      );
    });

    return () => {
      const events = document.querySelectorAll("[data-event]");
      const dayCells = document.querySelectorAll("[data-day]");

      events.forEach((event) => {
        event.removeEventListener("dragstart", () =>
          eventsDragStartHandler(event),
        );
        event.removeEventListener("dragend", () => eventsDragEndHandler(event));
      });

      dayCells.forEach((dayCell) => {
        dayCell.removeEventListener("dragover", (ev) =>
          dayCellDragOverHandler(ev, dayCell),
        );
      });
    };
  }, []);

  return (
    <section css={styles.monthSection}>
      <MonthGridHeader />
      <MonthGridCells />
    </section>
  );
};
