"use client";
import React from "react";
import { SelectedDateCtx } from "./selectedDateCtx";

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
	const [date, setDate] = React.useState(new Date().toISOString());

	const updateDate = React.useCallback((newDate: string) => {
		setDate(newDate);
	}, []);

  const contextValue = React.useMemo(() => ({
    date,
    updateDate
  }), [date, updateDate]);

	return (
		<SelectedDateCtx.Provider value={contextValue}>
			{children}
		</SelectedDateCtx.Provider>
	);
};
