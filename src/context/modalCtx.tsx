"use client";
import React from "react";

export const ModalCtx = React.createContext({
	showEventModal: false,
	setShowEventModal: (state: boolean) => {
		console.debug("modal state ", state);
	},
});

export const ModalCtxProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [showEventModal, setShowEventModal] = React.useState(false);

	const setShowEventModalCallback = React.useCallback((state: boolean) => {
		setShowEventModal(state);
	}, []);

	const eventModalContextValue = React.useMemo(
		() => ({
			showEventModal,
			setShowEventModal: setShowEventModalCallback,
		}),
		[showEventModal, setShowEventModalCallback],
	);

	return (
		<ModalCtx.Provider value={eventModalContextValue}>
			{children}
		</ModalCtx.Provider>
	);
};
