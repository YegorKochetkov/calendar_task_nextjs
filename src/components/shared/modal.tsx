/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

const styles = {
  dialog: css({
    minWidth: "25%",
    marginInline: "auto",
    marginBlockStart: "calc(100svh - 80svh)",
    padding: "1rem",
    border: "1px solid lightgrey",
    borderRadius: "0.25rem",
    "&::backdrop": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  }),
};

export const Modal =
  ({
    children,
    isOpen
  }: {
    children: React.ReactNode;
    isOpen: boolean;
  }) => {
    const dialogRef = React.useRef<HTMLDialogElement | null>(null);

    React.useEffect(() => {
      isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
    }, [ dialogRef, isOpen ]);

    return (
      <dialog ref={dialogRef} css={styles.dialog}>
        {children}
      </dialog>
    );
  }
  ;
