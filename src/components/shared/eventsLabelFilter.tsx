/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { labelsColors } from "@/lib/constants";
import { setCalendarEventsLabelFilter } from "@/stores/eventsStore";

const styles = {
  labels: css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 600px)": {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    "& label": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      margin: 0,
      marginInlineEnd: "0.5rem",
    },
    "& input": {
      position: "absolute",
      appearance: "none",
      border: "none",
    },
    "& input + span": {
      transition: "opacity 100ms",
      display: "inline-block",
      width: "1.5rem",
      aspectRatio: "1",
      borderRadius: "50%",
      backgroundColor: "var(--label-color)",
      opacity: "0.8",
      cursor: "pointer",
    },
    "& label:hover input + span": {
      transition: "opacity 100ms",
      opacity: "1",
    },
    "& input:checked + span": {
      outline: "1px solid var(--label-color)",
      outlineOffset: "2px",
    },
  }),
};

export const EventsLabelFilter = () => {
  const [ labelColor, setLabelColor ] = React.useState<string>("");

  const handleLabelClick = (label: string) => {
    if (labelColor === label) {
      setLabelColor("");
      setCalendarEventsLabelFilter("");
    } else {
      setLabelColor(label);
      setCalendarEventsLabelFilter(label);
    }
  };
  return (
    <div css={styles.labels}>
      <span>Labels:</span>
      {labelsColors.map((label, index) => (
        <label key={index}>
          <input
            type="radio"
            id={label}
            name="labels"
            value={label}
            hidden
            aria-hidden="false"
            checked={labelColor === label}
            onClick={() => handleLabelClick(label)}
          />
          <span
            style={{ "--label-color": `${label}` } as React.CSSProperties}
          />
          <span> {label}</span>
        </label>
      ))}
    </div>
  );
};
