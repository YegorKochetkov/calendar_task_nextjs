import React from "react";

import { ModalCtx } from "@/context/modalCtx";

export const CreateEventButton = () => {
	const { setShowModal } = React.useContext(ModalCtx);
	const addEventModalHandler = () => {
		setShowModal(true);
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
