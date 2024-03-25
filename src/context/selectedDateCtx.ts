"use client";
import React from "react";

export const SelectedDateCtx = React.createContext({
	date: new Date().toISOString(),
	updateDate: (newDate: string) => {
		console.debug("updateDate", newDate);
	},
});
