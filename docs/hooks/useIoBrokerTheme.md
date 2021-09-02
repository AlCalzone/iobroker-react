# `useIoBrokerTheme` hook

```ts
import { useIoBrokerTheme } from "iobroker-react/hooks";
```

ioBroker currently supports four different themes:
* light
* dark
* blue
* colored

Using the `useIoBrokerTheme` hook, you can determine which one is currently active and change it.

## Example

```tsx
import React from "react";
import { useIoBrokerTheme } from "iobroker-react/hooks";

const MyComponent: React.FC = () => {
	const [themeName, setTheme] = useIoBrokerTheme();

	// 1 second after the component is mounted, the theme will be changed to "dark"
	React.useEffect(() => {
		setTimeout(() => {
			setTheme("dark");
		}, 1000)
	}, []);

	// This info will be updated too
	return <div>The current theme name is {themeName}</div>;
};
```
