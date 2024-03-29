import React from "react";

import { showModal } from "@/stores/modalStore";

export const CreateEventButton = () => {
	const addEventModalHandler = () => {
		showModal(true);
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
