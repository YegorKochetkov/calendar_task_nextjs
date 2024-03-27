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
		const { showModal, setShowModal } = React.useContext(ModalCtx);

		React.useEffect(() => {
			if (!showModal) {
				return;
			}

			modalRef.current?.showModal();
			setShowModal(true);
		}, [showModal, setShowModal, modalRef]);

		return (
			<dialog ref={modalRef} css={styles.dialog}>
				{children}
			</dialog>
		);
	},
);
