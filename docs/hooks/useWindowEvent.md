# `useWindowEvent` hook

The `useWindowEvent` hook is used to subcribe to window events and react to them, like `"message"`, `"resize"`, etc.
This would normally be done by using the `window.addEventListener` and `window.removeEventListener` functions.

```ts
import { useWindowEvent } from "iobroker-react/hooks";
```

The hook takes the same arguments as the `window.addEventListener` function.

## Example

```tsx
import React from "react";
import { useWindowEvent } from "iobroker-react/hooks";

const MyComponent: React.FC = () => {
	const [name, setName] = React.useState("World");

	useWindowEvent("message", (msg) => {
		if (msg?.data != undefined) setName(msg.data);
	});

	// Displays "Hello World!" at first.
	// When the current page receives a message with content { data: "you" },
	// the output switches to "Hello you!"
	return <div>Hello {name}!</div>;
};
```
