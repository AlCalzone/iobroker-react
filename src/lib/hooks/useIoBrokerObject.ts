import React from "react";
import { useConnection } from "./useConnection";

export interface UseIoBrokerObjectOptions {
	/** Whether to subscribe to the object ID */
	subscribe?: boolean;
}

type BoundExtendObject<T extends string = string> = (
	obj: ioBroker.PartialObject & {
		type?: ioBroker.ObjectIdToObjectType<T>["type"];
	},
) => Promise<void>;

type BoundSetObject<T extends string = string> = (
	obj: ioBroker.SettableObject & {
		type?: ioBroker.ObjectIdToObjectType<T>["type"];
	},
) => Promise<void>;

/**
 * Hook to read/subscribe to an object within ioBroker or update it using extendObject.
 * @param objectId The object id to access
 *
 * The component must be wrapped in an `IoBrokerApp` or one of its variants. Example:
 * ```tsx
 * import { useIoBrokerObject } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   const [myObject, extendMyObject] = useIoBrokerObject("my-adapter.0.device1");
 *
 *   React.useEffect(() => {
 *     // Sets common.test to "test" after 1 second
 *     setTimeout(
 *       () => extendMyObject({common: {test: "test"}}),
 *       1000
 *     );
 *   }, []);
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
): readonly [
	object: ioBroker.ObjectIdToObjectType<T> | undefined,
	extendObject: BoundExtendObject<T>,
	setObject: BoundSetObject<T>,
] {
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

	const extendObject: BoundExtendObject<T> = (obj) => {
		return connection.extendObject(objectId, obj);
	};

	const _setObject: BoundSetObject<T> = (obj) => {
		return connection.setObject(objectId, obj);
	};

	return [object, extendObject, _setObject] as readonly [
		ioBroker.ObjectIdToObjectType<T> | undefined,
		BoundExtendObject<T>,
		BoundSetObject<T>,
	];
}
