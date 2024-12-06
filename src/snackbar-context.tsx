"use client";

import { createContext, useContext } from "react";
import type { TSnackbarContext } from "./types";

export const SnackbarContext = createContext<TSnackbarContext | undefined>(
	undefined,
);

export const useSnackbar = (): TSnackbarContext => {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error("useSnackbar must be used within a SnackbarProvider");
	}
	return context;
};
