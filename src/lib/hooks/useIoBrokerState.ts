import { isObject } from "alcalzone-shared/typeguards";
import React from "react";
import { useConnection } from "./useConnection";
export interface UseIoBrokerStateOptions<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
> {
	/** The ID of the state that is used for reading */
	id: string;
	/** The ID of the state that is used for writing. Defaults to `stateId` */
	writeId?: string;
	/** The default value that is used until the actual value has been retrieved */
	defaultValue?: T;
	/** The default ACK flag that is used until the actual state's ACK flag has been retrieved. Default: true */
	defaultAck?: boolean;
	/** Whether to subscribe to the state ID */
	subscribe?: boolean;
	/** Transforms the received values */
	transform?: (val: any) => T | undefined;
}

type BoundSetState = (
	state: ioBroker.State | ioBroker.StateValue | ioBroker.SettableState,
) => Promise<void>;

/**
 * Hook to read or subscribe to a state within ioBroker and get a method to update it.
 * @param stateId The state id to access
 * @param options Options configuring the behavior. See {@link UseIoBrokerStateOptions} for details
 *
 * The component must be wrapped in an `IoBrokerApp` or one of its variants. Example:
 * ```tsx
 * import { useIoBrokerState } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   const [myState, myStateAck, setMyState] = useIoBrokerState({
 *     id: "my-adapter.0.my-state",
 *     defaultValue: 1
 *   });
 *
 *   React.useEffect(() => {
 *     // Changes "my-adapter.0.my-state" in ioBroker to 2 after 1 second
 *     setTimeout(() => setMyState(2), 1000);
 *   }, []);
 *
 *   // Renders 1 until the state was read and the value of the state afterwards
 *   return (
 *     <div>{myState}</div>
 *   );
 * };
 * ```
 */
export function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	options: UseIoBrokerStateOptions<T> & { defaultValue: T },
): readonly [value: T, ack: boolean, setValue: BoundSetState];
export function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	options: UseIoBrokerStateOptions<T>,
): readonly [value: T | undefined, ack: boolean, setValue: BoundSetState];

export function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	options: UseIoBrokerStateOptions<T>,
): readonly [value: T | undefined, ack: boolean, setValue: BoundSetState] {
	const {
		id,
		writeId = id,
		subscribe = true,
		defaultValue,
		defaultAck = true,
		transform,
	} = options;

	const [value, setValue] = React.useState<T | undefined>(defaultValue);
	const [ack, setAck] = React.useState(defaultAck);

	const connection = useConnection();

	const updateValue: BoundSetState = React.useCallback(
		(state) => {
			// While updating a value on the server, update it locally with ACK = false
			// so the UI can show a response immediately
			if (isObject(state)) {
				if ("val" in state) setValue(state.val as T);
				if (typeof state.ack === "boolean") setAck(state.ack);
			} else {
				setValue(state as T);
				setAck(false);
			}

			// And update it on the server asynchronously
			return connection.setState(writeId, state);
		},
		[connection, writeId],
	);

	const onStateChange: ioBroker.StateChangeHandler = React.useCallback(
		(changedId, state) => {
			if (state && state.ack && changedId === id) {
				const value = state.val as T;
				setValue(transform ? transform(value) : value);
				setAck(state.ack);
			}
		},
		[id, transform],
	);

	const loadInitial = React.useCallback(async () => {
		// Only load the value
		const initial = await connection.getState(id);
		const value = (initial?.val ?? defaultValue) as T;
		const ack = initial?.ack ?? defaultAck;

		setValue(value);
		setAck(ack);
	}, [connection, defaultAck, defaultValue, id]);

	React.useEffect(() => {
		// Load value initially
		loadInitial();
		if (subscribe) {
			// After subscription, the value will be updated automatically
			connection.subscribeState(id, onStateChange);
		}

		// componentWillUnmount
		return () => {
			if (subscribe) connection.unsubscribeState(id, onStateChange);
		};
	}, [connection, id, loadInitial, onStateChange, subscribe]);

	return [value, ack, updateValue] as const;
}
