"use client";
import React from "react";

export const SelectedDateCtx = React.createContext({
	date: new Date().toISOString(),
	updateDate: (newDate: string) => {
		console.debug("updateDate", newDate);
	},
});

export const SelectedDateProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const dateFromStorage = localStorage.getItem("selectedDate");
	const selectedDate = dateFromStorage ? new Date(dateFromStorage) : new Date();
	const [date, setDate] = React.useState(selectedDate.toISOString());

	const updateDate = React.useCallback((newDate: string) => {
		localStorage.setItem("selectedDate", newDate);
		setDate(newDate);
	}, []);

	const dateContextValue = React.useMemo(
		() => ({
			date,
			updateDate,
		}),
		[date, updateDate],
	);

	return (
		<SelectedDateCtx.Provider value={dateContextValue}>
			{children}
		</SelectedDateCtx.Provider>
	);
};
