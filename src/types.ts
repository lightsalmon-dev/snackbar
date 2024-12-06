export enum ESnackbarMessageType {
	SUCCESS = "success",
	WARNING = "warning",
	ERROR = "error",
}

export type TSnackbarMessage = {
	id: number;
	message: string;
	type: ESnackbarMessageType;
};
export type TEnqueueSnackbar = (
	message: string,
	type: ESnackbarMessageType,
) => void;

export interface TSnackbarContext {
	enqueueSnackbar: (message: string, type: ESnackbarMessageType) => void;
}
