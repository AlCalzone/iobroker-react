# `useIoBrokerState` hook

```ts
import { useIoBrokerState } from "iobroker-react/hooks";
```

The `useIoBrokerState` hook allows you to read states from the ioBroker DB, subscribe to changes and change the state. It takes an object with the full state ID and optional configuration as the single parameter and returns a tuple with the state's value, `ack` flag and a function to update it.

This might look very intimidating, but is pretty simple in practice - see examples.

```ts
function useIoBrokerState<
	T extends ioBroker.State["val"] = ioBroker.State["val"],
>(
	options: UseIoBrokerStateOptions<T>,
): readonly [
	/** The value of the state that belongs to the given ID */
	value: T | undefined,
	/** The ACK flag of the state that belongs to the given ID */
	ack: boolean,
	/** A function to update the state. Like `setState`, but does not take an ID. */
	setValue: BoundSetState,
];

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
	subscribe?: boolean; // Default: true
	/** Transforms the received values before being returned from the function */
	transform?: (val: any) => T | undefined;
}
```

Until the state has been read from the DB, the returned value will either be `undefined` or the given `defaultValue`.
Likewise the returned `ack` flag will either be `true` or the given `defaultAck`.

## Example 1: Display a state's value and it's ACK flag

```tsx
import { useIoBrokerState } from "iobroker-react/hooks";

const MyComponent: React.FC<MyAppProps> = (props) => {
	const [myState, myStateAck] = useIoBrokerState({
		id: "my-adapter.0.my-state",
		defaultValue: 1,
		defaultAck: false,
	});

	// Renders 1 / false until the state was read and the value/ack of the state afterwards
	return (
		<div>
			state: {myState}
			ack: {myStateAck ? "true" : "false"}
		</div>
	);
};
```

## Example 2: Read a state and update it after a second

```tsx
import { useIoBrokerState } from "iobroker-react/hooks";

const MyComponent: React.FC<MyAppProps> = (props) => {
	const [myState, , setMyState] = useIoBrokerState({
		id: "my-adapter.0.my-state",
		defaultValue: 1,
	});

	React.useEffect(() => {
		// Changes "my-adapter.0.my-state" in ioBroker to 2 after one second
		setTimeout(() => setMyState(2), 1000);
	}, []);

	// Renders 1 until the state was read and the value of the state afterwards
	return <div>{myState}</div>;
};
```

## Example 3: Works with objects too

```tsx
import { useIoBrokerState } from "iobroker-react/hooks";

const MyComponent: React.FC<MyAppProps> = (props) => {
	const [, myStateAck, setMyState] = useIoBrokerState({
		id: "my-adapter.0.my-state",
	});

	React.useEffect(() => {
		// Changes "my-adapter.0.my-state"'s ACK in ioBroker to false after one second
		setTimeout(() => setMyState({ ack: false }), 1000);
	}, []);

	// Renders 1 until the state was read and the value of the state afterwards
	return <div>{myStateAck}</div>;
};
```

## Example 4: No subscription

```tsx
import { useIoBrokerState } from "iobroker-react/hooks";

const MyComponent: React.FC<MyAppProps> = (props) => {
	const [myState] = useIoBrokerState({
		id: "my-adapter.0.my-state",
		subscribe: false,
	});

	// Renders the value of "my-adapter.0.my-state" and never updates it
	return <div>{myState}</div>;
};
```

## Example 5: Parse a string to a number

```tsx
import { useIoBrokerState } from "iobroker-react/hooks";

const MyComponent: React.FC<MyAppProps> = (props) => {
	const [myState] = useIoBrokerState({
		id: "my-adapter.0.my-state",
		transform: (val: string) => parseInt(val, 10),
	});

	// Renders the value of "my-adapter.0.my-state" (which is a string) plus 1
	return <div>{myState + 1}</div>;
};
```

> [!ATTENTION] `transform` MUST NOT be used to parse stringified arrays/objects. Due to a limitation of the `useIoBrokerState` hook, this will cause an infinite rendering loop otherwise.
