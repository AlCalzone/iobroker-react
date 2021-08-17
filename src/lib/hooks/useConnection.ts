import type {
	Connection,
	EmitEventHandler,
	ListenEventHandler,
} from "@iobroker/socket-client";
import React from "react";

export const ConnectionContext = React.createContext<Connection>({} as any);
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
