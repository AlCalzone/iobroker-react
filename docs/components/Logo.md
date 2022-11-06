# `Logo`

The `Logo` component is used to display the logo of the Adapter and add the `save` and `load` buttons vor the current configuration of the Adapter to the header.

```ts
import { Logo } from "iobroker-react/components";
```

The `Logo` component has an optional `classes` prop which controls the CSS classes of the logo and button:

```ts
interface LogoProps {
	/** The CSS classes of the logo and buttons. */
	classes?: { button?: string; logo?: string };
}
```

## Example without `classes`

```tsx
import React from "react";
import { Logo } from "iobroker-react/components";

const ExampleComponent: React.FC = () => {
  return (
    <div>
		<Logo />
    </div>
  );
};
```

## Example with `classes`
The `classes` property can be used to control the CSS classes of the logo and buttons logo` and `button` can also be defined separately.

```tsx
import React from "react";
import { Logo } from "iobroker-react/components";

export const ExampleComponent: React.FC = (): JSX.Element => {
  return (
    <div>
		<Logo classes={{ buttons: "myButtons", logo: "myLogo",}} />
    </div>
  );
};
```


