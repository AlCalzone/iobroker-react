import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useI18n } from "../i18n";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		background: theme.saveToolbar.background,
		display: "flex",
		flexFlow: "row nowrap",
		justifyItems: "space-between",
		gap: theme.spacing(1),
		padding: theme.spacing(1, 4),
	},
	button: {
		fontWeight: "bold",
	},
}));

export interface SaveCloseButtonsProps {
	onSave: (close: boolean) => void;
	onClose: () => void;

	changed: boolean;
	hasErrors?: boolean;
}

const SaveCloseButtons: React.FC<SaveCloseButtonsProps> = (props) => {
	const { onSave, onClose, changed, hasErrors } = props;
	const classes = useStyles();
	const { translate } = useI18n();
	const theme = useTheme();
	const textOnButtons = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<div className={classes.root}>
			{textOnButtons ? (
				<>
					<Button
						aria-label="Save"
						variant="contained"
						size="large"
						className={classes.button}
						startIcon={<SaveIcon />}
						onClick={() => onSave(false)}
						disabled={!changed || !!hasErrors}
					>
						{translate("ra_Save")}
					</Button>
					<Button
						aria-label="Save and Close"
						variant="contained"
						size="large"
						className={classes.button}
						startIcon={<SaveIcon />}
						onClick={() => onSave(true)}
						disabled={!changed || !!hasErrors}
					>
						{translate("ra_Save and close")}
					</Button>
					<Button
						aria-label="Close"
						variant="contained"
						size="large"
						className={classes.button}
						startIcon={<CloseIcon />}
						onClick={onClose}
						style={{ marginLeft: "auto" }}
					>
						{translate("ra_Close")}
					</Button>
				</>
			) : (
				<>
					<Button
						aria-label="Save"
						variant="contained"
						size="large"
						className={classes.button}
						onClick={() => onSave(false)}
						disabled={!changed || !!hasErrors}
					>
						<SaveIcon />
					</Button>
					<Button
						aria-label="Save and Close"
						variant="contained"
						size="large"
						className={classes.button}
						startIcon={<SaveIcon />}
						endIcon={<CloseIcon />}
						onClick={() => onSave(true)}
						disabled={!changed || !!hasErrors}
					>
						+
					</Button>
					<Button
						aria-label="Close"
						variant="contained"
						size="large"
						className={classes.button}
						onClick={onClose}
						style={{ marginLeft: "auto" }}
					>
						<CloseIcon />
					</Button>
				</>
			)}
		</div>
	);
};

export default SaveCloseButtons;
