# `SaveCloseButtons`

This component displays the Save and Close buttons of the `SettingsApp`. It is a simplified and cleaned up version of the component from `@iobroker/adapter-react-v5`.
You shouldn't need to use it directly.

```ts
import { SaveCloseButtons } from "iobroker-react/components";
```

The `SaveCloseButtons` component has the following props:
```ts
interface SaveCloseButtonsProps {
	/** Will be called when the Save button (close = false) or the Save&Close button (close = true) is clicked  */
	onSave: (close: boolean) => void;
	/** Will be called when the Close button is clicked  */
	onClose: () => void;

	/** Indicates whether the settings are changed. If `false`, the Save buttons will be disabled. */
	changed: boolean;
	/** (optional) Indicates whether the settings are invalid. If `true`, the Save buttons will be disabled. */
	hasErrors?: boolean;
}
```
