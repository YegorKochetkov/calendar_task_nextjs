/** @jsxImportSource @emotion/react */
"use client";
import React from "react";
import { css } from "@emotion/react";

import { Modal } from "./shared/modal";
import { ModalCtx } from "@/context/modalCtx";

const styles = {
	dialogHeader: css({
		marginBlockEnd: "1.5rem",
	}),

	dialogForm: css({
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		"& label": {
			display: "flex",
			flexDirection: "column",
			marginBlockEnd: "0.5rem",
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

	dialogCtrl: css({
		display: "flex",
		justifyContent: "flex-end",
		gap: "0.5rem",
		marginBlockStart: "1rem",
	}),
};

export const AddEventModal = () => {
	const { setShowModal } = React.useContext(ModalCtx);
	const modalRef = React.useRef<HTMLDialogElement | null>(null);

	const submitModalHandler = () => {
		modalRef.current?.close();
		setShowModal(false);
	};

	const cancelModalHandler = () => {
		modalRef.current?.close();
		setShowModal(false);
	};

	const [title, setTitle] = React.useState("");

	return (
		<Modal modalRef={modalRef}>
			<header css={styles.dialogHeader}>Add Event</header>
			<form css={styles.dialogForm}>
				<label>
					<span>Title</span>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
			</form>
			<footer css={styles.dialogCtrl}>
				<button
					type="button"
					className="btn"
					value="save"
					onClick={submitModalHandler}
				>
					Save
				</button>
				<button
					type="button"
					className="btn"
					value="cancel"
					onClick={cancelModalHandler}
				>
					Cancel
				</button>
			</footer>
		</Modal>
	);
};
