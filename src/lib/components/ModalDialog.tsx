import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
		console.log("handleClose");
		if (props.onClose() !== false) setOpen(false);
	}, [props]);

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth={false}
		>
			<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
			<DialogContent>
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
				<DialogActions>
					{props.showYesButton && (
						<Button
							onClick={() => {
								props?.yesButtonClick?.();
							}}
							color="primary"
							autoFocus
							disabled={props.yesButtonEnabled === false}
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
						>
							{props.noButtonText}
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};
