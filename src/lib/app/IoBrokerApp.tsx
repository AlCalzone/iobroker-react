import React from "react";
import { Connection, ConnectionProps } from "@iobroker/socket-client";
import { ConnectionContext } from "../hooks/useConnection";

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
}

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
	const [connection, setConnection] = React.useState<Connection>();

	React.useEffect(() => {
		const _connection = new Connection({
			name: props.name,
			onReady: () => {
				setConnection(_connection);
			},
			onError: (err) => {
				console.error(err);
			},
		});
	}, []);

	return connection ? (
		<ConnectionContext.Provider value={connection}>
			{props.children}
		</ConnectionContext.Provider>
	) : (
		<>loading...</>
	);
};
