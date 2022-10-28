# `SettingsApp`

The `SettingsApp` is a predefined app component specifically meant for the adapter configuration UI and includes buttons to save and close the configuration. If you use it, it must be the outermost component in your ioBroker UI. It internally uses `IoBrokerApp`, so you don't need to use that one yourself.

This component takes the same props as the `IoBrokerApp` plus these optional ones:
```ts
interface SettingsAppProps {
	/**
	 * Will be called after the adapter settings have been loaded from ioBroker.
	 * Allows you to modify the settings before they are used to render the UI.
	 */
	afterLoad?(settings: Record<string, any>): void;

	/**
	 * Will be called before the adapter settings will be saved in ioBroker and
	 * allows you to modify and validate them.
	 * If this method returns `false`, the settings will not be saved.
	 */
	beforeSave?(settings: Record<string, any>): boolean | undefined;

	/**
	 * Define which settings are stored encrypted
	 */
	encryptedFields?: string[];
}
```

## Example

Rendering the configuration UI is up to you. Here's a very basic example with just a checkbox that changes the `option1` property:

```ts
import React from "react";
import ReactDOM from "react-dom";

// UI elements are imported from Material-UI
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { SettingsApp } from "iobroker-react/app";
import { useSettings, useI18n } from "iobroker-react/hooks";

const SettingsPageContent: React.FC = React.memo(() => {
	// settings is the current settings object, including the changes made in the UI
	// originalSettings is the original settings object, as it was loaded from ioBroker
	// setSettings is used to update the current settings object
	const { settings, originalSettings, setSettings } = useSettings<ioBroker.AdapterConfig>();
	const { translate: _ } = useI18n();

	// Updates the settings when the checkbox changes. The changes are not saved yet.
	const handleChange = <T extends keyof ioBroker.AdapterConfig>(
		option: T,
		value: ioBroker.AdapterConfig[T],
	) => {
		setSettings((s) => ({
			...s,
			[option]: value,
		}));
	};

	return (
		<div>
			<FormControlLabel
				label={_("Enable option 1")}
				control={
					<Checkbox
						checked={settings.option1}
						onChange={(event, checked) => handleChange("option1", checked)}
					/>
				}
			/>
		</div>
	);
});

const migrateSettings = (settings: ioBroker.AdapterConfig) => {
	// Here's an example for editing settings after they are loaded from the backend
	// In this case, option1 will be set to true by default
	if (settings.option1 === undefined) {
		settings.option1 = true;
	}
};

// Load your translations
const translations: Translations = {
	en: require("./i18n/en.json"),
	de: require("./i18n/de.json"),
	// ... other translations
};

const Root: React.FC = () => {
	return (
		<SettingsApp
			name="my-adapter"
			afterLoad={migrateSettings}
			translations={translations}
		>
			<SettingsPageContent />
		</SettingsApp>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));
```

> [!NOTE] Wrapping your content component in `React.memo` is optional, but recommended to reduce the amount of re-rendering when the context of the `IoBrokerApp` changes.
