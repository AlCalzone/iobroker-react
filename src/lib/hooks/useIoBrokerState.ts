import React from "react";
import { useConnection } from "./useConnection";
export interface UseIoBrokerStateOptions<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
> {
	/** The default value that is used until the actual value has been retrieved */
	defaultValue?: T | undefined;
	/** Whether to subscribe to the state ID */
	subscribe?: boolean;
	/** Transforms the received values */
	transform?: (val: any) => T | undefined;
}

/**
 * Links a React state to a state in ioBroker and returns a way to set the value in the backend.
 * @param stateId The state id to access
 */
export function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	stateId: string,
	options: UseIoBrokerStateOptions<T> & { defaultValue: T },
): readonly [
	T,
	(value: Parameters<ioBroker.Adapter["setStateAsync"]>[1]) => Promise<void>,
];

export function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	stateId: string,
	options?: UseIoBrokerStateOptions<T>,
): readonly [
	T | undefined,
	(value: Parameters<ioBroker.Adapter["setStateAsync"]>[1]) => Promise<void>,
];

export function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	stateId: string,
	options: UseIoBrokerStateOptions<T> = {},
): readonly [
	T | undefined,
	(value: Parameters<ioBroker.Adapter["setStateAsync"]>[1]) => Promise<void>,
] {
	const { subscribe = true, defaultValue, transform } = options;

	const [value, setValue] = React.useState<T | undefined>(defaultValue);
	const connection = useConnection();

	const onStateChange: ioBroker.StateChangeHandler = (id, state) => {
		if (state && state.ack && id === stateId) {
			const value = state?.val as T;
			setValue(transform ? transform(value) : value);
		}
	};

	React.useEffect(() => {
		(async () => {
			// Load value initially
			if (subscribe) {
				// After subscription, the value will be updated automatically
				await connection.subscribeState(stateId, onStateChange);
			} else {
				// Only load the value
				const initialValue = (await connection.getState(stateId))
					?.val as T;
				setValue(transform ? transform(initialValue) : initialValue);
			}
		})();

		// componentWillUnmount
		return () => {
			if (subscribe) connection.unsubscribeState(stateId, onStateChange);
		};
	}, []);

	return [
		value,
		(newValue) => connection.setState(stateId, newValue),
	] as const;
}
