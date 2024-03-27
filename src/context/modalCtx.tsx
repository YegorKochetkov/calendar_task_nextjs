"use client";
import React from "react";

export const ModalCtx = React.createContext({
	showModal: false,
	setShowModal: (state: boolean) => {
		console.debug("modal state ", state);
	},
});

export const ModalCtxProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [showModal, setShowModal] = React.useState(false);

	const setShowModalCallback = React.useCallback((state: boolean) => {
		setShowModal(state);
	}, []);

	const modalContextValue = React.useMemo(
		() => ({
			showModal,
			setShowModal: setShowModalCallback,
		}),
		[showModal, setShowModalCallback],
	);

	return (
		<ModalCtx.Provider value={modalContextValue}>{children}</ModalCtx.Provider>
	);
};
