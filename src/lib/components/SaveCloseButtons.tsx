import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
// import I18n from "../i18n";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
	}),
);
export interface SaveCloseButtonsProps {
	onSave: (close: boolean) => void;
	onClose: () => void;

	noTextOnButtons?: boolean;
	// isIFrame?: boolean; // bottom position 0 or 38 for iFrame
	changed: boolean;
	hasErrors?: boolean;
}

const SaveCloseButtons: React.FC<SaveCloseButtonsProps> = (props) => {
	const { onSave, onClose, changed, hasErrors } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Button
				aria-label="Save"
				variant="contained"
				size="large"
				// color="primary"
				className={classes.button}
				startIcon={<SaveIcon />}
				onClick={() => onSave(false)}
				disabled={!changed || !!hasErrors}
			>
				Save
				{/* {!noTextOnButtons && I18n.t("ra_Save")} */}
			</Button>

			<Button
				aria-label="Save and Close"
				variant="contained"
				size="large"
				// color="primary"
				className={classes.button}
				startIcon={<SaveIcon />}
				onClick={() => onSave(true)}
				disabled={!changed || !!hasErrors}
			>
				Save and Close
				{/* {!noTextOnButtons && I18n.t("ra_Save")} */}
			</Button>

			<Button
				aria-label="Close"
				variant="contained"
				size="large"
				// color="default"
				className={classes.button}
				startIcon={<CloseIcon />}
				onClick={onClose}
				style={{ marginLeft: "auto" }}
			>
				Close
				{/* {!noTextOnButtons && I18n.t("ra_Save")} */}
			</Button>
		</div>
	);
};

// class SaveCloseButtons extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		try {
// 			this.isIFrame = !props.newReact && window.self !== window.top;
// 		} catch (e) {
// 			this.isIFrame = !props.newReact;
// 		}
// 	}

// 	render() {
// 		const noTextOnButtons = this.props.noTextOnButtons;
// 		const buttonStyle = {
// 			borderRadius: this.props.theme.saveToolbar.button.borderRadius || 3,
// 			height: this.props.theme.saveToolbar.button.height || 32,
// 		};

// 		const style = {
// 			bottom: this.isIFrame ? 38 : 0,
// 			left: this.props.paddingLeft || 0,
// 			right: 0,
// 			position: "absolute",
// 			background: this.props.theme.saveToolbar.background,
// 		};
// 		if (this.props.dense) {
// 			style.minHeight = 48;
// 		}

// 		if (this.props.error) {
// 			buttonStyle.border = "1px solid red";
// 		}

// 		return (
// 			<Toolbar position="absolute" style={style}>
// 				<Fab
// 					variant="extended"
// 					aria-label="Save"
// 					disabled={!this.props.changed || this.props.error}
// 					onClick={() => this.props.onSave(false)}
// 					style={buttonStyle}
// 				>
// 					<IconSave
// 						className={
// 							!noTextOnButtons
// 								? this.props.classes.buttonIcon
// 								: ""
// 						}
// 					/>
// 					{!noTextOnButtons && I18n.t("ra_Save")}
// 				</Fab>
// 				<Fab
// 					variant="extended"
// 					aria-label="Save and close"
// 					disabled={!this.props.changed || this.props.error}
// 					onClick={() => this.props.onSave(true)}
// 					style={Object.assign({}, buttonStyle, { marginLeft: 10 })}
// 				>
// 					<IconSave
// 						className={
// 							!noTextOnButtons
// 								? this.props.classes.buttonIcon
// 								: ""
// 						}
// 					/>
// 					{!noTextOnButtons ? I18n.t("ra_Save and close") : "+"}
// 					{noTextOnButtons && <IconClose />}
// 				</Fab>
// 				<div style={{ flexGrow: 1 }} />
// 				<Fab
// 					variant="extended"
// 					aria-label="Close"
// 					onClick={() => this.props.onClose()}
// 					style={buttonStyle}
// 				>
// 					<IconClose
// 						className={
// 							!noTextOnButtons
// 								? this.props.classes.buttonIcon
// 								: ""
// 						}
// 					/>
// 					{!noTextOnButtons && I18n.t("ra_Close")}
// 				</Fab>
// 			</Toolbar>
// 		);
// 	}
// }

// const _export = withStyles(styles)(SaveCloseButtons);
export default SaveCloseButtons;
