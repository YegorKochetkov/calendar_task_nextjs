/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { ModalCtx } from "@/context/modalCtx";

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
		const { showEventModal, setShowEventModal } = React.useContext(ModalCtx);

		React.useEffect(() => {
			if (!showEventModal) {
				return;
			}

			modalRef.current?.showModal();
			setShowEventModal(true);
		}, [showEventModal, setShowEventModal, modalRef]);

		return (
			<dialog ref={modalRef} css={styles.dialog}>
				{children}
			</dialog>
		);
	},
);
