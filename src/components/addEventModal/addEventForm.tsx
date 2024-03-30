/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { labelsColors } from "@/lib/constants";

const styles = {
  dialogForm: css({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    "& label": {
      display: "flex",
      flexDirection: "column",
      marginBlockEnd: "1rem",
    },
    "& label > span": {
      marginBlockEnd: "0.25rem",
    },
    "& input": {
      padding: "0.5rem",
      border: "1px solid lightgrey",
      borderRadius: "0.25rem",
    },
  }),

  labelsColors: css({
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    "& label": {
      position: "relative",
      margin: 0,
    },
    "& legend": {
      marginBlockEnd: "0.5rem",
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

export const AddEventForm = ({
  title,
  onSetTitle,
  labelColor,
  onSetLabelColor,
}: {
  title: string;
  onSetTitle: (title: string) => void;
  labelColor: string;
  onSetLabelColor: (labelColor: string) => void;
}) => {
  return (
    <form css={styles.dialogForm} id="addEventForm">
      <label>
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => onSetTitle(e.target.value)}
          required
          autoComplete="off"
          max={64}
        />
      </label>
      <fieldset css={styles.labelsColors}>
        <legend>Select a color tag:</legend>
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
              onClick={() => onSetLabelColor(label)}
            />
            <span
              style={{ "--label-color": `${label}` } as React.CSSProperties}
            />
          </label>
        ))}
      </fieldset>
    </form>
  );
};
