# `useGlobals` hook

The `useGlobals` hook is used to access some global constants identifying the current adapter.

```ts
import { useGlobals } from "iobroker-react/hooks";
```

It returns an object with the following properties:

```ts
interface IGlobalsContext {
	/** The name of the adapter this UI belongs to */
	adapter: string;
	/** The adapter instance this UI belongs to */
	instance: number;
	/**
	 * The namespace under which this instance's states are stored, for example `my-adapter.0`. This is the same as `${adapter}.${instance}`.
	 */
	namespace: `${string}.${number}`;
}
```

## Example

```tsx
import React from "react";
import { useGlobals } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const { adapter, instance, namespace } = useGlobals();

	return (
		<div>
			Adapter: {adapter}<br />
			Instance: {instance}<br />
			Namespace: {namespace}
		</div>
	);
};
```
