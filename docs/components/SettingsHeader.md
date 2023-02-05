# `SettingsHeader`

The `SettingsHeader` component is used to display the following at the top of the settings screen:

-   Logo of the Adapter
-   Buttons to **export** and **import** the current configuration
-   Optionally a link to the documentation of the adapter

```ts
import { SettingsHeader } from "iobroker-react/components";
```

The `SettingsHeader` component has an optional `classes` prop which controls the CSS classes of the logo and button:

```ts
interface SettingsHeaderProps {
	/** The CSS classes of the logo and buttons. */
	classes?: { button?: string; logo?: string };
}
```

## Example without `classes`

```tsx
import { SettingsHeader } from "iobroker-react/components";
import React from "react";

const ExampleComponent: React.FC = () => {
	return (
		<div>
			<SettingsHeader />
		</div>
	);
};
```

## Example with `classes`

The `classes` property can be used to control the CSS classes of the logo and/or buttons.

```tsx
import { SettingsHeader } from "iobroker-react/components";
import React from "react";

export const ExampleComponent: React.FC = () => {
	return (
		<div>
			<SettingsHeader
				classes={{ buttons: "myButtons", logo: "myLogo" }}
			/>
		</div>
	);
};
```
