# `useExpertMode` hook

The `useExpertMode` hook returns a `boolean` that can be used to determine whether **expert mode** is currently active.

```ts
import { useExpertMode } from "iobroker-react/hooks";
```

## Example

```tsx
import React from "react";
import { useExpertMode } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	const isExpertMode = useExpertMode();

	return <div>Expert mode is {isExpertMode ? "on" : "off"}</div>;
};
```
