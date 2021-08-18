import React from "react";
import { useConnection } from "./useConnection";

export interface UseIoBrokerObjectOptions {
	/** Whether to subscribe to the object ID */
	subscribe?: boolean;
}

/**
 * Hook to read or subscribe to an object within ioBroker.
 * @param objectId The object id to access
 *
 * The component must be wrapped in an `IoBrokerApp` or one of its variants. Example:
 * ```tsx
 * import { useIoBrokerObject } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   const myObject = useIoBrokerObject("my-adapter.0.device1");
 *
 *   return (
 *     <div>{myObject?.common.name ?? "UNKNOWN"}</div>
 *   );
 * };
 * ```
 */
export function useIoBrokerObject<T extends string>(
	objectId: T,
	options: UseIoBrokerObjectOptions = {},
): ioBroker.ObjectIdToObjectType<T> | undefined {
	const { subscribe = true } = options;

	const [object, setObject] = React.useState<ioBroker.Object>();
	const connection = useConnection();

	React.useEffect(() => {
		const onObjectChange: ioBroker.ObjectChangeHandler = (id, obj) => {
			setObject(obj ?? undefined);
		};

		(async () => {
			if (subscribe) {
				await connection.subscribeObject(objectId, onObjectChange);
			}
			// Load object initially
			const initialValue = await connection.getObject(objectId);
			setObject(initialValue ?? undefined);
		})();

		// componentWillUnmount
		return () => {
			if (subscribe) {
				connection.unsubscribeObject(objectId, onObjectChange);
			}
		};
	}, [connection, objectId, subscribe]);

	return object as ioBroker.ObjectIdToObjectType<T> | undefined;
}
