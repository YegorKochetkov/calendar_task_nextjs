/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import { MonthGridHeader } from "./monthGridHeader";
import { MonthGridCells } from "./monthGridCells";
import { fetchHoliday } from "@/lib/fetchHolidays";
import { getDragAfterElement } from "@/lib/utils";
import {
  getDraggingEventNextDate,
  setDraggingEventId,
  setDraggingEventNextDate,
} from "@/stores/dragNDropStateStore";
import { updateCalendarEventDate } from "@/stores/eventsStore";

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

  // Drag & drop
  React.useEffect(() => {
    const dayCells = document.querySelectorAll("[data-day]");

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

    const dayDragEndHandler = () => {
      dayCells.forEach((dayCell) => {
        const eventsInDay: { eventId: string; newEventDate: string }[] = [];
        const eventsList = dayCell
          .querySelector("[data-events-list]")
          ?.querySelectorAll("[data-event]");

        if (!eventsList || eventsList?.length === 0) return;

        Array.from(eventsList).forEach((event) => {
          const newEventDate = getDraggingEventNextDate();
          const eventId = event.getAttribute("data-event-id")!;

          const data = {
            eventId,
            newEventDate,
          };

          eventsInDay.push(data);
        });

        for (let event of eventsInDay) {
          updateCalendarEventDate(event.newEventDate, event.eventId);
        }
      });
    };

    dayCells.forEach((dayCell) => {
      dayCell.addEventListener("dragover", (ev) =>
        dayCellDragOverHandler(ev, dayCell),
      );

      dayCell.addEventListener("dragend", dayDragEndHandler);
    });

    return () => {
      const dayCells = document.querySelectorAll("[data-day]");

      dayCells.forEach((dayCell) => {
        dayCell.removeEventListener("dragover", (ev) =>
          dayCellDragOverHandler(ev, dayCell),
        );

        dayCell.removeEventListener("dragend", dayDragEndHandler);
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
