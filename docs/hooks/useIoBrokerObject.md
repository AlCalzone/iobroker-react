# `useIoBrokerObject` hook

```ts
import { useIoBrokerObject } from "iobroker-react/hooks";
```

The `useIoBrokerObject` hook allows you to read objects from the ioBroker DB, subscribe to changes and extend the objects. It takes the full object ID and optional options as parameters and returns a tuple with the object and a function to update it.

```ts
function useIoBrokerObject(
	/** The full object ID */
	objectId: string,
	/** Optional options */
	options: UseIoBrokerObjectOptions = {},
): readonly [
	/** The object that belongs to the ID. The return type will be inferred from the object ID, for example `system.adapter.my-adapter.0` will be an InstanceObject */
	object: ioBroker.ObjectIdToObjectType<T> | undefined,
	/** A function to update the object using deep merge. Like `extendObject`, but does not take an ID. */
	extendObject: BoundExtendObject<T>,
	/** A function to overwrite the object. Like `setObject`, but does not take an ID. */
	setObject: BoundSetObject<T>,
]

interface UseIoBrokerObjectOptions {
	/** Whether to subscribe to the object ID. If `false`, the object is only read but not synchronized. */
	subscribe?: boolean; // Default: true
}
```

> [!ATTENTION] Until the object has been read from the DB, the hook returns `undefined` for the object property.

## Example 1: Display the `common.name` of an object

```tsx
import React from "react";
import { useIoBrokerObject } from "iobroker-react/hooks";

const MyComponent: React.FC = () => {
	const [myObject] = useIoBrokerObject("my-adapter.0.myObject");

	return myObject ? (
		<div>The object's name is {myObject.common.name}</div>
	) : (
		<div>Loading...</div>
	);
};
```

## Example 2: Display the `common.name` of an object and change it after 5 seconds

```tsx
import React from "react";
import { useIoBrokerObject } from "iobroker-react/hooks";

const MyComponent: React.FC = () => {
	const [myObject, extendMyObject] = useIoBrokerObject(
		"my-adapter.0.myObject",
	);

	React.useEffect(() => {
		setTimeout(() => {
			extendMyObject({ common: { name: "My new name" } });
		}, 5000);
	}, []);

	return myObject ? (
		<div>The object's name is {myObject.common.name}</div>
	) : (
		<div>Loading...</div>
	);
};
```

## Example 3: Read object once, but don't subscribe to updates

```tsx
import React from "react";
import { useIoBrokerObject } from "iobroker-react/hooks";

const MyComponent: React.FC = () => {
	const [myObject] = useIoBrokerObject("my-adapter.0.myObject", {
		subscribe: false,
	});

	return myObject ? (
		<div>
			The object's name is {myObject.common.name} (and always will be!)
		</div>
	) : (
		<div>Loading...</div>
	);
};
```
