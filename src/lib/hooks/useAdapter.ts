import { useIoBrokerState } from "./useIoBrokerState";
import React from "react";

export interface AdapterContextData {
	alive: boolean;
	connected: boolean;
}

export const AdapterContext = React.createContext<AdapterContextData>({
	alive: false,
	connected: false,
});

/** Hook to subscribe to the adapter's `alive` and `connected` states */
export function useAdapter(): AdapterContextData {
	const namespace = `${adapter}.${instance}`;
	const aliveId = `system.adapter.${namespace}.alive`;
	const connectedId = `${namespace}.info.connection`;

	const [alive] = useIoBrokerState({ id: aliveId, defaultValue: false });
	const [connected] = useIoBrokerState({
		id: connectedId,
		defaultValue: false,
	});

	return { alive, connected };
}
