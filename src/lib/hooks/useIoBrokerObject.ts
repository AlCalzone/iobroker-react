import React from "react";
import { useConnection } from "./useConnection";

export interface UseIoBrokerObjectOptions {
	/** Whether to subscribe to the object ID */
	subscribe?: boolean;
}

/**
 * Links a React state to an object in ioBroker
 * @param objectId The object id to access
 */
export function useIoBrokerObject<T extends string>(
	objectId: T,
	options: UseIoBrokerObjectOptions = {},
): ioBroker.ObjectIdToObjectType<T> | undefined {
	const { subscribe = true } = options;

	const [object, setObject] = React.useState<ioBroker.Object>();
	const connection = useConnection();

	const onObjectChange: ioBroker.ObjectChangeHandler = (id, obj) => {
		setObject(obj ?? undefined);
	};

	React.useEffect(() => {
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
	}, []);

	return object as ioBroker.ObjectIdToObjectType<T> | undefined;
}
