# `useConnection` hook

The `useConnection` hook provides access to the socket connection to the ioBroker backend.

```ts
import { useConnection } from "iobroker-react/hooks";
```

It returns an instance of the `Connection` class. See the documentation of https://github.com/ioBroker/socket-client/ for more details. You can use it to implement custom `sendTo` commands (or do whatever you like to do with the socket).

## Example

```tsx
import React from "react";
import { useConnection, useGlobals } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const connection = useConnection();
	const { namespace } = useGlobals();

	// This will be called when the button is clicked and sends a command to the adapter
	const invokeCommand = React.useCallback(async () => {
		const result = await connection.sendTo(
			namespace,
			"doSomething",
			12345,
		);
		if (!result) console.error("Nope!");
	}, [connection, namespace]);

	return (
		<Button onClick={invokeCommand}>Click me!</Button>
	);
};
```
