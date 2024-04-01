/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { Modal } from "../shared/modal";
import { SelectedDay } from "../shared/selectedDay";
import { AddEventForm } from "./addEventForm";

import { $modalsState, closeModal } from "@/stores/modalsStore";
import { labelsColors } from "@/lib/constants";
import { $selectedDay } from "@/stores/selectedDayStore";
import {
  $selectedCalendarEvent,
  CalendarEvent,
  addCalendarEvent,
  deleteCalendarEvent,
  setSelectedCalendarEvent,
  updateCalendarEvent,
} from "@/stores/eventsStore";

const styles = {
  dialog: css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }),

  dialogHeader: css({
    marginBlockEnd: "1rem",
  }),

  dialogCtrl: css({
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginBlockStart: "1rem",
    "& button[name='delete']": {
      marginInlineEnd: "auto",
    },
  }),
};

export const AddEventModal = () => {
  const selectedDay = useStore($selectedDay);
  const selectedEvent = useStore($selectedCalendarEvent);
  const { addEventModal } = useStore($modalsState);
  const [ openAddEventModal, setOpenAddEventModal ] = React.useState(
    addEventModal === "show",
  );

  const [ title, setTitle ] = React.useState("");
  const [ labelColor, setLabelColor ] = React.useState(labelsColors[ 0 ]);

  const submitModalHandler = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ev.preventDefault();
    const newEvent: CalendarEvent = {
      id: selectedEvent?.id ? selectedEvent.id : Date.now().toString(),
      title,
      labelColor,
      date: new Date(selectedDay).toISOString(),
    };

    selectedEvent
      ? updateCalendarEvent(newEvent.date, newEvent)
      : addCalendarEvent(newEvent.date, newEvent);
    setTitle("");
    setLabelColor(labelsColors[ 0 ]);
    setSelectedCalendarEvent(null);
    closeModal("addEventModal");
  };

  const cancelModalHandler = () => {
    setSelectedCalendarEvent(null);
    closeModal("addEventModal");
  };

  const deleteModalHandler = () => {
    deleteCalendarEvent(selectedEvent?.date!, selectedEvent?.id!);
    setSelectedCalendarEvent(null);
    closeModal("addEventModal");
  };

  React.useEffect(() => {
    setOpenAddEventModal(addEventModal === "show");
  }, [ addEventModal ]);

  React.useEffect(() => {
    setTitle(selectedEvent ? selectedEvent.title : "");
    setLabelColor(selectedEvent ? selectedEvent.labelColor : labelsColors[ 0 ]);
  }, [ selectedEvent ]);

  return (
    <Modal isOpen={openAddEventModal}>
      <div css={styles.dialog}>
        <header css={styles.dialogHeader}>
          {selectedEvent ? "Edit Event" : "Add Event"}
        </header>
        <AddEventForm
          title={title}
          onSetTitle={setTitle}
          labelColor={labelColor}
          onSetLabelColor={setLabelColor}
        />
        <SelectedDay
          formatter={{
            day: "numeric",
            weekday: "long",
            month: "long",
            year: "numeric",
          }}
        />
        <footer css={styles.dialogCtrl}>
          {selectedEvent && (
            <button
              type="button"
              className="btn"
              name="delete"
              value="delete"
              onClick={deleteModalHandler}
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            className="btn"
            value="save"
            name="save"
            onClick={(ev) => submitModalHandler(ev)}
            form="addEventForm"
            disabled={!title}
          >
            Save
          </button>
          <button
            type="button"
            className="btn"
            value="cancel"
            name="cancel"
            onClick={cancelModalHandler}
          >
            Cancel
          </button>
        </footer>
      </div>
    </Modal>
  );
};
