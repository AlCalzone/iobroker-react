import React from "react";
import type { ThemeName } from "../shared/theme";

interface IIoBrokerThemeContext {
	themeName: ThemeName;
	setTheme: (themeName: ThemeName) => void;
}

export const IoBrokerThemeContext = React.createContext<IIoBrokerThemeContext>(
	{} as any,
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useIoBrokerTheme = (): readonly [
	themeName: ThemeName,
	setTheme: (themeName: ThemeName) => void,
] => {
	const ctx = React.useContext(IoBrokerThemeContext);
	return [ctx.themeName, ctx.setTheme];
};
