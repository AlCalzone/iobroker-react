import { Connection, ConnectionProps } from "@iobroker/socket-client";
import { ThemeProvider } from "@material-ui/core";
import React from "react";
import { ConnectionContext } from "../hooks/useConnection";
import type { ThemeType as ThemeName } from "../shared/theme";
import getTheme from "../shared/theme";

// Little workaround
(window as any).adapter ??= window.location.pathname.split("/")[2]; // "/adapter/zwave2/tab_m.html"
(window as any).instance ??=
	new URLSearchParams(window.location.search).get("instance") ?? // ?instance=0
	parseInt(
		/config\/system\.adapter\.[^\.]+(?<instance>\d+)/i.exec(
			window.location.hash,
		)?.groups?.instance ?? "0",
		10,
	);
(window as any).namespace ??= `${adapter}.${instance}`;
(window as any)._ ??= (a: any) => a;

// layout components
export interface IoBrokerAppProps {
	name: ConnectionProps["name"];
	theme?: ThemeName;
}

const ThemeSwitcherContext = React.createContext<(theme: ThemeName) => void>(
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useThemeSwitcher = () => React.useContext(ThemeSwitcherContext);

/**
 * The basis for all ioBroker apps. Wrap your app in this component. Example:
 * ```tsx
 * import { IoBrokerApp } from "iobroker-react/app";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   // do your thing...
 *
 *   return (
 *     <div>Hello World!</div>
 *   );
 * };
 *
 * const MyApp: React.FC = () => {
 *   // This will render your component once the backend is connected
 *   return (
 *     <MyComponent name="my-adapter">
 *       <MyAppContent prop1="foo" />
 *     </IoBrokerApp>
 *   );
 * };
 * ```
 */
export const IoBrokerApp: React.FC<IoBrokerAppProps> = (props) => {
	const { name, theme = "light" } = props;

	// Manage connection
	const [connection, setConnection] = React.useState<Connection>();
	React.useEffect(() => {
		const _connection = new Connection({
			name,
			onReady: () => {
				setConnection(_connection);
			},
			onError: (err) => {
				console.error(err);
			},
		});
	}, [name]);

	// Manage themes
	const [themeName, setThemeName] = React.useState<ThemeName>(theme);
	const themeInstance = getTheme(themeName);

	return connection ? (
		<ThemeSwitcherContext.Provider value={setThemeName}>
			<ThemeProvider theme={themeInstance}>
				<ConnectionContext.Provider value={connection}>
					{props.children}
				</ConnectionContext.Provider>
			</ThemeProvider>
		</ThemeSwitcherContext.Provider>
	) : (
		<>loading...</>
	);
};
