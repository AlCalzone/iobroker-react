# `Dropdown`

A thin wrapper around Material UI's `Select` component, specifically for dropdowns. It takes the same props as the `Select` component plus these:
```ts
interface DropdownProps = {
	/** An array of possible options */
	options?: DropdownOption[];
	/** The value of the currently selected option */
	selectedOption: any;
	/** An optional message to show when no options are given */
	noOptionsMessage?: string;
	/** An optional message to show when no option is selected */
	placeholder?: string;
}

interface DropdownOption {
	value: any;
	label: string;
}
```

```ts
import { Dropdown } from "iobroker-react/components";
```
