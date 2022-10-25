import orange from "@mui/material/colors/orange";
import type { PaperClassKey } from "@mui/material/Paper";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import type { StyleRules } from "@mui/styles";
import { padStart } from "alcalzone-shared/strings";
// import type { Theme } from "@mui/material/styles";
/** The default ioBroker colors which are used for the logo. */
const ioBrokerColors = {
	lightBlue: "#3399cc",
	darkBlue: "#164477",
};

export type ThemeName = "light" | "dark" | "colored" | "blue";
export type ThemeType = "light" | "dark";

declare module "@mui/material/styles" {
	interface Theme {
		name: ThemeName;
		toolbar: {
			height: number;
		};
		saveToolbar: {
			background: string;
			button: {
				borderRadius: number;
				height: number;
			};
		};
	}
	interface ThemeOptions {
		name: ThemeName;
		toolbar: {
			height: number;
		};
		saveToolbar: {
			background: string;
			button: {
				borderRadius: number;
				height: number;
			};
		};
	}
}

declare module "@mui/material/styles/createPalette" {
	interface Palette {
		expert: Palette["primary"];
		logo: {
			background: string;
			start: string;
			primary: string;
			secondary: string;
			grow: string;
		};
	}
	interface PaletteOptions {
		expert: PaletteOptions["primary"];
		logo: {
			background: string;
			start: string;
			primary: string;
			secondary: string;
			grow: string;
		};
	}
}

const step = (16 - 5) / 23 / 100;

/**
 * Convert hex color in the format '#rrggbb' or '#rgb' to an RGB object.
 */
function toInt(hex: string): { r: number; g: number; b: number } {
	const rgb = {
		r: 0,
		g: 0,
		b: 0,
	};

	if (hex.length === 7) {
		rgb.r = parseInt(hex.substr(1, 2), 16);
		rgb.g = parseInt(hex.substr(3, 2), 16);
		rgb.b = parseInt(hex.substr(5, 2), 16);
	} else if (hex.length === 4) {
		const r = hex.substr(1, 1);
		const g = hex.substr(2, 1);
		const b = hex.substr(3, 1);

		rgb.r = parseInt(r + r, 16);
		rgb.g = parseInt(g + g, 16);
		rgb.b = parseInt(b + b, 16);
	}

	return rgb;
}

/**
 * Convert an RGB object to a hex color string in the format '#rrggbb'.
 */
function toHex(int: { r: number; g: number; b: number }): string {
	return `#${padStart(Math.round(int.r).toString(16), 2, "0")}${padStart(
		Math.round(int.g).toString(16),
		2,
		"0",
	)}${padStart(Math.round(int.b).toString(16), 2, "0")}`;
}

/**
 * @param color color in the format '#rrggbb' or '#rgb'
 * @param overlayColor overlay color in the format '#rrggbb' or '#rgb'
 * @param elevation elevation as an integer starting with 1
 * @returns the hex color string in the format '#rrggbb'
 */
function getElevation(
	color: string,
	overlayColor: string,
	elevation: number,
): string {
	const rgb = toInt(color);
	const overlay = toInt(overlayColor);

	rgb.r += overlay.r * (0.05 + step * (elevation - 1));
	rgb.g += overlay.g * (0.05 + step * (elevation - 1));
	rgb.b += overlay.b * (0.05 + step * (elevation - 1));

	return toHex(rgb);
}

/**
 * Get all 24 elevations of the given color and overlay.
 * @param {string} color color in the format '#rrggbb' or '#rgb'
 * @param {string} overlay overlay color in the format '#rrggbb' or '#rgb'
 */
function getElevations(
	color: string,
	overlay: string,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/ban-types
): Partial<StyleRules<PaperClassKey, {}>> {
	const elevations: Record<string, any> = {};

	for (let i = 1; i <= 24; i++) {
		elevations[`elevation${i}`] = {
			backgroundColor: getElevation(color, overlay, i),
		};
	}

	return elevations;
}

export function getActiveTheme(): ThemeName {
	const vendorPrefix = (window as any).vendorPrefix;
	if (vendorPrefix && vendorPrefix !== "@@vendorPrefix@@") {
		return vendorPrefix;
	}

	return (
		(window.localStorage?.getItem("App.themeName") as ThemeName) ??
		(window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "colored")
	);
}

export function setActiveTheme(theme: ThemeName): void {
	const vendorPrefix = (window as any).vendorPrefix;
	if (vendorPrefix && vendorPrefix !== "@@vendorPrefix@@") {
		return; // ignore
	}
	window.localStorage.setItem("App.themeName", theme);
	window.localStorage.setItem(
		"App.theme",
		theme === "dark" || theme === "blue" ? "dark" : "light",
	);
}

/**
 * The theme creation factory function.
 */
const getTheme = (type: ThemeName): Theme => {
	let theme: ThemeOptions;
	if (type === "dark") {
		// @ts-expect-error This is fine!
		theme = {
			name: type,
			palette: {
				mode: "dark",
				background: {
					paper: "#121212",
					default: "#121212",
				},
				primary: {
					main: "#4dabf5",
				},
				secondary: {
					main: "#436a93",
				},
				text: {
					primary: "#ffffff",
					secondary: "#ffffff",
				},
				expert: {
					main: "#14bb00",
				},
				logo: {
					background: "black",
					start: "#040404",
					primary: ioBrokerColors.lightBlue,
					secondary: ioBrokerColors.darkBlue,
					grow: "#1d1d1d",
				},
			},
			components: {
				MuiAppBar: {
					styleOverrides: {
						colorDefault: {
							backgroundColor: "#272727",
						},
					},
				},
				MuiLink: {
					styleOverrides: {
						root: {
							textTransform: "uppercase",
							transition: "color .3s ease",
							color: orange[200],
							"&:hover": {
								color: orange[100],
							},
						},
					},
				},
				MuiPaper: getElevations("#121212", "#fff"),
			},
		};
	} else if (type === "blue") {
		// @ts-expect-error This is fine!
		theme = {
			name: type,
			palette: {
				mode: "dark",
				background: {
					paper: "#151d21",
					default: "#151d21",
				},
				primary: {
					main: "#4dabf5",
				},
				secondary: {
					main: "#436a93",
				},
				text: {
					primary: "#ffffff",
					secondary: "#ffffff",
				},
				expert: {
					main: "#14bb00",
				},
				logo: {
					background: "black",
					start: "#040404",
					primary: ioBrokerColors.lightBlue,
					secondary: ioBrokerColors.darkBlue,
					grow: "#1d1d1d",
				},
			},
			components: {
				MuiAppBar: {
					styleOverrides: {
						colorDefault: {
							backgroundColor: "#2a3135",
						},
					},
				},
				MuiLink: {
					styleOverrides: {
						root: {
							textTransform: "uppercase",
							transition: "color .3s ease",
							color: orange[200],
							"&:hover": {
								color: orange[100],
							},
						},
					},
				},
				MuiPaper: getElevations("#151d21", "#fff"),
			},
		};
	} else if (type === "colored") {
		// @ts-expect-error This is fine!
		theme = {
			name: type,
			palette: {
				mode: "light",
				primary: {
					main: "#3399CC",
				},
				secondary: {
					main: "#164477",
				},
				expert: {
					main: "#96fc96",
				},
				logo: {
					background: "white",
					start: "#fefefe",
					primary: ioBrokerColors.lightBlue,
					secondary: ioBrokerColors.darkBlue,
					grow: "#d0d0d0",
				},
			},
			components: {
				MuiAppBar: {
					styleOverrides: {
						colorDefault: {
							backgroundColor: "#3399CC",
						},
					},
				},
				MuiLink: {
					styleOverrides: {
						root: {
							textTransform: "uppercase",
							transition: "color .3s ease",
							color: orange[400],
							"&:hover": {
								color: orange[300],
							},
						},
					},
				},
			},
		};
		// } else if (type === "PT") {
		// 	// @ts-expect-error This is fine!
		// 	theme = {
		// 		name: type,
		// 		palette: {
		// 			type: "light",
		// 			primary: {
		// 				main: "#0F99DE",
		// 			},
		// 			secondary: {
		// 				main: "#88A536",
		// 			},
		// 			expert: {
		// 				main: "#BD1B24",
		// 			},
		// 		},
		// 		overrides: {
		// 			MuiAppBar: {
		// 				colorDefault: {
		// 					backgroundColor: "#0F99DE",
		// 				},
		// 			},
		// 			MuiLink: {
		// 				root: {
		// 					textTransform: "uppercase",
		// 					transition: "color .3s ease",
		// 					color: orange[400],
		// 					"&:hover": {
		// 						color: orange[300],
		// 					},
		// 				},
		// 			},
		// 		},
		// 	};
	} else {
		// light
		// @ts-expect-error This is fine!
		theme = {
			name: type as any,
			palette: {
				mode: "light",
				primary: {
					main: "#3399CC",
				},
				secondary: {
					main: "#164477",
				},
				expert: {
					main: "#14bb00",
				},
				logo: {
					background: "white",
					start: "#fefefe",
					primary: ioBrokerColors.lightBlue,
					secondary: ioBrokerColors.darkBlue,
					grow: "#d0d0d0",
				},
			},
			components: {
				MuiLink: {
					styleOverrides: {
						root: {
							textTransform: "uppercase",
							transition: "color .3s ease",
							color: orange[400],
							"&:hover": {
								color: orange[300],
							},
						},
					},
				},
			},
		};
	}

	theme.toolbar = {
		height: 48,
	};

	// add save toolbar
	theme.saveToolbar = {
		// @ts-expect-error This is fine!
		background: theme.palette.primary.main,
		button: {
			borderRadius: 3,
			height: 32,
		},
	};

	// theme.logo = {
	// 	primary

	return createTheme(theme);
};

export default getTheme;
