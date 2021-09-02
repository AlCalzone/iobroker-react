# `useAdapter` hook

The `useAdapter` hook is used to subscribe to the adapter's `alive` and `connected` states.

```ts
import { useAdapter } from "iobroker-react/hooks";
```

It returns an object with the following properties:

```ts
interface AdapterContextData {
	alive: boolean;
	connected: boolean;
}
```

## Example

```tsx
import React from "react";
import { useAdapter } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const { alive, connected } = useAdapter();

	return (
		<div>
			Adapter is running/alive: {alive}<br />
			Adapter is connected: {connected}
		</div>
	);
};
```
