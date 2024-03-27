"use client";
import type React from "react";
import { SelectedDateProvider } from "./selectedDateCtx";
import { ModalCtxProvider } from "./modalCtx";

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<SelectedDateProvider>
			<ModalCtxProvider>{children}</ModalCtxProvider>
		</SelectedDateProvider>
	);
};
