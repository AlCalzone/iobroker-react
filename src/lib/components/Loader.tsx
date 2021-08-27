/**
 * Copyright 2018-2021 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 **/
import React from "react";

export interface LoaderProps {
	/** The size in pixels of this loader. */
	size?: number;
	// TODO: Extract this into an enum
	theme?: "dark" | "light";
}

// TODO: convert .css file to styled components

const Loader: React.FC<LoaderProps> = (props) => {
	const { size = 234, theme = "light" } = props;
	return (
		<div className={`logo-back logo-background-${theme}`}>
			<div
				className="logo-div FOOOOO"
				style={{ width: size, height: size }}
			>
				<div
					className={`logo-top logo-background-${theme}`}
					style={{ left: "37%" }}
				/>
				<div
					className={`logo-top logo-background-${theme}`}
					style={{ left: "57%" }}
				/>
				<div
					className={`logo-border logo-background-${theme} logo-animate-wait`}
					style={{ borderWidth: size * 0.132 }}
				/>
				<div className={`logo-i logo-animate-color-inside-${theme}`} />
				<div
					className={`logo-i-top logo-animate-color-inside-${theme}`}
					style={{ top: "18%" }}
				/>
				<div
					className={`logo-i-top logo-animate-color-inside-${theme}`}
					style={{ bottom: "18%" }}
				/>
			</div>
			<div
				className={`logo-animate-grow logo-animate-grow-${theme}`}
				style={{ width: size + 11, height: size + 11 }}
			/>
		</div>
	);
};
export default Loader;
