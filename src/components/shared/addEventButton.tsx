import React from "react";

import { showModal } from "@/stores/modalsStore";

export const AddEventButton = () => {
  const addEventModalHandler = () => {
    showModal("addEventModal");
  };

  return (
    <button
      type="button"
      className="btn btn-with-icon"
      onClick={addEventModalHandler}
    >
      <span className="icon-calendar-plus-o" />
      Add event
    </button>
  );
};
