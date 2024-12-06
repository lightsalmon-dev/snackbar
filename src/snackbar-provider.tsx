"use client";

import {
	type FC,
	type PropsWithChildren,
	type ReactNode,
	useState,
} from "react";
import { SnackbarContext } from "./snackbar-context";
import {
	ESnackbarMessageType,
	type TEnqueueSnackbar,
	type TSnackbarMessage,
} from "./types";

let idCounter = 0;

type SnackbarProvider = FC<
	PropsWithChildren<{
		classNameContainer?: string;
		classNameMessage?: string;
		classNameSuccessMessage?: string;
		classNameErrorMessage?: string;
		iconSuccess: ReactNode;
		iconFail: ReactNode;
		ttl: number;
	}>
>;

export const SnackbarProvider: SnackbarProvider = ({
	classNameContainer,
	classNameMessage,
	classNameErrorMessage,
	iconSuccess,
	iconFail,
	classNameSuccessMessage,
	children,
	ttl,
}) => {
	const [snackbars, setSnackbars] = useState<TSnackbarMessage[]>([]);

	const enqueueSnackbar: TEnqueueSnackbar = (message, type) => {
		const newSnackbar: TSnackbarMessage = { id: idCounter++, message, type };
		setSnackbars((prev) => [...prev, newSnackbar]);

		// Remove the snackbar after `ttl` seconds
		setTimeout(() => {
			setSnackbars((prev) =>
				prev.filter((snack) => snack.id !== newSnackbar.id),
			);
		}, ttl);
	};

	return (
		<SnackbarContext.Provider value={{ enqueueSnackbar }}>
			{children}
			<aside className={classNameContainer} aria-live="polite">
				{snackbars.map((snack, i) => {
					const icon =
						snack.type === ESnackbarMessageType.SUCCESS
							? iconSuccess
							: iconFail;

					return (
						<section
							key={`${i}-${snack.id}`}
							className={[
								classNameMessage,
								snack.type === ESnackbarMessageType.SUCCESS
									? classNameSuccessMessage
									: null,
								snack.type === ESnackbarMessageType.ERROR
									? classNameErrorMessage
									: null,
							]
								.filter(Boolean)
								.join(" ")}
							// biome-ignore lint/a11y/useSemanticElements: <explanation>
							role="status"
						>
							{icon}
							{snack.message}
						</section>
					);
				})}
			</aside>
		</SnackbarContext.Provider>
	);
};
