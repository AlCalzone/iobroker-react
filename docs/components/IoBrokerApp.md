# `IoBrokerApp`

The `IoBrokerApp` must be the outermost component in your ioBroker UI. It provides the connection to the ioBroker backend and sets up the context used by all hooks. It takes the following props:
```ts
interface IoBrokerAppProps {
	/** Used for the socket connection */
	name: string;
	/** Provide adapter-specific translations in addition to the default ones */
	translations?: Translations;
	/** When this prop is given, the loader will continue spinning until it is no longer `false` */
	contentReady?: boolean;
}
```

## Example:
```tsx
import React from "react";
import ReactDOM from "react-dom";

import { IoBrokerApp } from "iobroker-react/app";
import { useAdapter, useGlobals, useI18n } from "iobroker-react/hooks";
import type { Translations } from "iobroker-react/i18n";

// Load your translations
const translations: Translations = {
	en: require("./i18n/en.json"),
	de: require("./i18n/de.json"),
	// ... other translations
};

// This is the main component of your adapter/UI
// In this example, it renders an information if your adapter process is currently running.
const Root: React.FC = React.memo(() => {
	// The alive variable is synchronized with the state `system.adapter.my-adapter.0.alive`
	const { alive } = useAdapter();
	const { namespace } = useGlobals();
	const { translate: _ } = useI18n();

	return (
		<>
			<h1>{_("Hello World!")}</h1>
			The adapter {namespace} is {alive ? "running" : "not running"}.
		</>
	);
});

// Render the main component in an ioBroker app wrapper, which provides everything needed to communicate with ioBroker
ReactDOM.render(
	<IoBrokerApp name="my-adapter" translations={translations}>
		<Root />
	</IoBrokerApp>,
	document.getElementById("root"),
);
```

> [!NOTE] Wrapping the `Root` component in `React.memo` is optional, but recommended to reduce the amount of re-rendering when the context of the `IoBrokerApp` changes.
