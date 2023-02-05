import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export interface ModalDialogProps {
	title: string;
	message: React.ReactNode | string;
	isOpen?: boolean;

	showYesButton: boolean;
	yesButtonEnabled?: boolean;
	yesButtonText: string;
	yesButtonClick: () => void;

	showNoButton: boolean;
	noButtonEnabled?: boolean;
	noButtonText: string;
	noButtonClick: () => void;

	/**
	 * Will be called when the user tries to close the dialog.
	 * If this callback returns `false`, the dialog will not close.
	 */
	onClose: () => boolean | void;

	classNames?: Partial<{
		dialog: string;
		dialogTitle: string;
		dialogContent: string;
		dialogActions: string;
		yesButton: string;
		noButton: string;
	}>;
}

export type ModalState = {
	isOpen: boolean;
} & Omit<ModalDialogProps, "isOpen">;

export type ShowModal = (
	title: string,
	message: React.ReactNode | string,
	options?: Partial<{
		yesButtonText: string;
		noButtonText: string;
		yesButtonEnabled: boolean;
		noButtonEnabled: boolean;
		showNoButton: boolean;
		showYesButton: boolean;
		classNames?: ModalDialogProps["classNames"];
	}>,
) => Promise<boolean>;

export const ModalDialog: React.FC<ModalDialogProps> = (props) => {
	const [isOpen, setOpen] = React.useState(props.isOpen ?? false);
	// Using useEffect is necessary to update isOpen when the props change later
	React.useEffect(() => {
		setOpen(props.isOpen ?? false);
	}, [props.isOpen]);

	const handleClose = React.useCallback(() => {
		// Ask the application whether the dialog should close
		if (props.onClose() !== false) setOpen(false);
	}, [props]);

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth={false}
			className={props.classNames?.dialog}
		>
			<DialogTitle
				id="alert-dialog-title"
				className={props.classNames?.dialogTitle}
			>
				{props.title}
			</DialogTitle>
			<DialogContent className={props.classNames?.dialogContent}>
				{typeof props.message === "string" ? (
					<DialogContentText
						id="alert-dialog-description"
						dangerouslySetInnerHTML={{
							__html: props.message.replace(/\n/g, "<br />"),
						}}
					/>
				) : (
					props.message
				)}
			</DialogContent>
			{(props.showYesButton || props.showNoButton) && (
				<DialogActions className={props.classNames?.dialogActions}>
					{props.showYesButton && (
						<Button
							onClick={() => {
								props?.yesButtonClick?.();
							}}
							color="primary"
							autoFocus
							disabled={props.yesButtonEnabled === false}
							className={props.classNames?.yesButton}
						>
							{props.yesButtonText}
						</Button>
					)}
					{props.showNoButton && (
						<Button
							onClick={() => {
								props?.noButtonClick?.();
							}}
							color="primary"
							disabled={props.noButtonEnabled === false}
							className={props.classNames?.noButton}
						>
							{props.noButtonText}
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};
