/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";
import { useStore } from "@nanostores/react";

import { $modalState, showModal } from "@/stores/modalStore";

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

export const Modal = React.forwardRef(
  ({
    children,
    modalRef,
  }: {
    children: React.ReactNode;
    modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  }) => {
    const isModalOpen = useStore($modalState);

    React.useEffect(() => {
      if (!isModalOpen) {
        return;
      }

      modalRef.current?.showModal();
      showModal();
    }, [ modalRef, isModalOpen ]);

    return (
      <dialog ref={modalRef} css={styles.dialog}>
        {children}
      </dialog>
    );
  },
);

Modal.displayName = "Modal";
