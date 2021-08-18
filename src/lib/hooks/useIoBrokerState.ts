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

	const [{ value, ack }, setValue] = React.useState<{
		value: T | undefined;
		ack: boolean;
	}>({
		value: defaultValue,
		ack: defaultAck,
	});

	const connection = useConnection();

	React.useEffect(() => {
		const onStateChange: ioBroker.StateChangeHandler = (
			changedId,
			state,
		) => {
			if (state && state.ack && changedId === id) {
				const value = state.val as T;
				setValue({
					value: transform ? transform(value) : value,
					ack: state.ack,
				});
			}
		};

		(async () => {
			// Load value initially
			if (subscribe) {
				// After subscription, the value will be updated automatically
				await connection.subscribeState(id, onStateChange);
			} else {
				// Only load the value
				const initial = await connection.getState(id);
				const val = (initial?.val ?? defaultValue) as T;
				const ack = initial?.ack ?? defaultAck;
				setValue({
					value: transform ? transform(val) : val,
					ack,
				});
			}
		})();

		// componentWillUnmount
		return () => {
			if (subscribe) connection.unsubscribeState(id, onStateChange);
		};
	}, [connection, defaultAck, defaultValue, id, subscribe, transform]);

	const updateValue: BoundSetState = (state) => {
		// While updating a value on the server, update it locally with ACK = false
		// so the UI can show a response immediately
		setValue((cur) => {
			const value = (
				isObject(state)
					? "val" in state
						? state.val
						: cur.value
					: state
			) as T;
			const ack = isObject(state) && "ack" in state ? state.ack : false;
			return { value, ack };
		});
		// And update it on the server asynchronously
		return connection.setState(writeId, state);
	};

	return [value, ack, updateValue] as const;
}
