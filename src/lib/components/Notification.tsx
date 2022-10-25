import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { amber, green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import type { Theme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import * as React from "react";

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: "flex",
		alignItems: "center",
	},
}));

export type ShowNotification = (
	message: string,
	variant: NotificationProps["variant"],
	timeout?: number,
) => void;

export interface NotificationProps {
	variant: keyof typeof variantIcon;
	message: string;
	timeout?: number;
	isOpen: boolean;
	onClose: () => void;
}

export interface NotificationState {
	isOpen: boolean;
	message: string;
	timeout?: number;
	variant: NotificationProps["variant"];
}

export const Notification: React.FC<NotificationProps> = (props) => {
	const classes = useStyles();

	function handleClose() {
		props.onClose();
	}

	const autoHideDuration =
		props.timeout === undefined
			? 5000
			: props.timeout === 0
			? null
			: props.timeout;

	const Icon = variantIcon[props.variant];
	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			open={props.isOpen}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
		>
			<SnackbarContent
				className={classes[props.variant]}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon
							className={clsx(classes.icon, classes.iconVariant)}
						/>
						<span
							dangerouslySetInnerHTML={{
								__html: props.message.replace(/\n/g, "<br />"),
							}}
						/>
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						onClick={handleClose}
					>
						<CloseIcon className={classes.icon} />
					</IconButton>,
				]}
			/>
		</Snackbar>
	);
};
