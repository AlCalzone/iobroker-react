/**
 * Copyright 2018-2021 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 **/
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

export interface LoaderProps {
	/** The size in pixels of this loader. */
	size?: number;
}

const useStyles = makeStyles((theme) => ({
	loaderBackground: {
		background: theme.palette.logo.background,
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 1000,
		overflow: "hidden",

		display: "grid",
		alignItems: "center",
		justifyItems: "center",
	},
	loaderLogo: {
		position: "relative",
		width: "var(--size)",
		height: "var(--size)",

		overflow: "hidden",
		borderRadius: "50%",
		zIndex: 2,
	},
	loaderLogo_i_cutout: {
		position: "absolute",
		width: "4.5%",
		height: "16%",
		top: 0,
		zIndex: 2,
		background: theme.palette.logo.background,
		animation: "$logo-color-cutout 1s 1 ease forwards",
	},
	loaderLogo_spinner: {
		position: "absolute",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",

		borderColor: theme.palette.logo.secondary,
		borderTopColor: theme.palette.logo.primary,
		borderRadius: "50%",
		borderStyle: "solid",
		borderWidth: "calc(0.132 * var(--size))",

		animation: "$logo-color-outside 1.5s, $logo-spin 1.5s linear infinite",
	},
	loaderLogo_i: {
		position: "absolute",
		width: "14%",
		height: "68%",
		top: "16%",
		left: "43%",

		borderRadius: "50% / 2%",

		background: theme.palette.logo.primary,
		animation: "$logo-i-fade 2.5s",
	},

	loaderGrow: {
		position: "absolute",
		width: "var(--size)",
		height: "var(--size)",

		background: theme.palette.logo.grow,
		borderRadius: "50%",

		textAlign: "center",
		zIndex: 1,
		transform: "scale(1.05)",

		animation: "$logo-grow 1s 1 ease forwards",
	},

	"@keyframes logo-spin": {
		"100%": {
			transform: "rotate(360deg)",
		},
	},

	"@keyframes logo-i-fade": {
		"0%": {
			opacity: 0,
		},
		"100%": {
			opacity: 1,
		},
	},

	"@keyframes logo-color-cutout": {
		"0%": {
			background: theme.palette.logo.grow,
		},
		"100%": {
			background: theme.palette.logo.background,
		},
	},

	"@keyframes logo-color-outside": {
		"0%": {
			borderColor: "transparent",
		},
		"100%": {
			borderTopColor: theme.palette.logo.primary,
			borderLeftColor: theme.palette.logo.secondary,
			borderBottomColor: theme.palette.logo.secondary,
			borderRightColor: theme.palette.logo.secondary,
		},
	},

	"@keyframes logo-grow": {
		"0%": {
			transform: "scale(1.05)",
			background: theme.palette.logo.grow,
		},
		"100%": {
			transform: "scale(10)",
			background: theme.palette.logo.background,
		},
	},
}));

const Loader: React.FC<LoaderProps> = (props) => {
	const { size = 234 } = props;
	const classes = useStyles();

	return (
		<div
			className={classes.loaderBackground}
			style={{
				// @ts-expect-error
				"--size": `${size}px`,
			}}
		>
			<div className={classes.loaderLogo}>
				<div
					className={classes.loaderLogo_i_cutout}
					style={{ right: "57%" }}
				/>
				<div
					className={classes.loaderLogo_i_cutout}
					style={{ left: "57%" }}
				/>
				<div className={classes.loaderLogo_spinner} />

				<div className={classes.loaderLogo_i} />
			</div>
			<div className={classes.loaderGrow} />
		</div>
	);
};
export default Loader;
