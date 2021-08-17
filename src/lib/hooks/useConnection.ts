import type {
	Connection,
	EmitEventHandler,
	ListenEventHandler,
} from "@iobroker/socket-client";
import React from "react";

export const ConnectionContext = React.createContext<Connection>({} as any);

/**
 * Hook to access the connection object once it is available. The component must be wrapped in an `IoBrokerApp` or one of its variants. Example:
 * ```tsx
 * import { useConnection } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   const connection = useConnection();
 *   const [done, setDone] = React.useState(false);
 *
 *   React.useEffect(() => {
 *     connection
 *       .sendTo(...)
 *       .then(() => setDone(true));
 *   }, []);
 *
 *   return done ? (
 *     <div>done!</div>
 *   ) : (
 *     <div>not done yet!</div>
 *   );
 * };
 * ```
 */
export const useConnection = <
	CustomListenEvents extends Record<
		keyof CustomListenEvents,
		ListenEventHandler
	> = Record<string, never>,
	CustomEmitEvents extends Record<
		keyof CustomEmitEvents,
		EmitEventHandler
	> = Record<string, never>,
>(): Connection<CustomListenEvents, CustomEmitEvents> =>
	React.useContext(ConnectionContext);

// TODO: Document customizing the event types
