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
	yesButtonText: string;
	noButtonText: string;
	showYesButton: boolean;
	showNoButton: boolean;
	isOpen?: boolean;
	onClose: (result: boolean) => void;
}

export type ModalState = {
	isOpen: boolean;
} & Pick<
	ModalDialogProps,
	| "title"
	| "message"
	| "yesButtonText"
	| "noButtonText"
	| "showNoButton"
	| "showYesButton"
	| "onClose"
>;

export type ShowModal = (
	title: string,
	message: React.ReactNode | string,
	options?: Partial<{
		yesButtonText: string;
		noButtonText: string;
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

	function handleClose(result: boolean) {
		setOpen(false);
		props.onClose(result);
	}

	return (
		<Dialog
			open={isOpen}
			onClose={() => handleClose(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			maxWidth={false}
		>
			<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
			<DialogContent>
				<DialogContentText
					id="alert-dialog-description"
					dangerouslySetInnerHTML={
						typeof props.message === "string"
							? {
									__html: props.message.replace(
										/\n/g,
										"<br />",
									),
							  }
							: undefined
					}
					children={
						typeof props.message !== "string"
							? props.message
							: undefined
					}
				/>
			</DialogContent>
			{(props.showYesButton || props.showNoButton) && (
				<DialogActions>
					{props.showYesButton && (
						<Button
							onClick={() => handleClose(true)}
							color="primary"
							autoFocus
						>
							{props.yesButtonText}
						</Button>
					)}
					{props.showNoButton && (
						<Button
							onClick={() => handleClose(false)}
							color="primary"
						>
							{props.noButtonText}
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};
