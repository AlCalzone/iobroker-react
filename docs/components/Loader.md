# `Loader`

This component displays the loading ioBroker icon. The original version from `@iobroker/adapter-react` has some problems, so this one is used as a replacement.
You shouldn't need to use it directly, as it is included in the `IoBrokerApp` component and can be displayed by controlling its `contentLoaded` prop.

```ts
import { Loader } from "iobroker-react/components";
```

The `Loader` component has an optional `size` prop which controls the size of the logo. The loader itself is always fullscreen:
```ts
interface LoaderProps {
	/** The size in pixels of this loader. */
	size?: number;
}
```
