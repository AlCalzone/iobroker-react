# `useI18n` hook

The `useI18n` hook is used to provide internationalization support to your UI.

```ts
import { useI18n } from "iobroker-react/hooks";
```

It returns an object with the following properties, of which you'll usually only need the `translate` function:

```ts
interface I18nContext {
	/** The currently configured language */
	language: ioBroker.Languages;
	/** Change the current language. You shouldn't need to use this, as the IoBrokerApp takes care of it. */
	setLanguage(language: ioBroker.Languages): void;

	/** Add translations to the translation dictionary. This is used internally by the IoBrokerApp and you shouldn't need to use it. */
	extendTranslations(translations: Translations): void;
	/** Overrides the translations dictionary with the given one */
	setTranslations(translations: Translations): void;

	/**
	 * Translate the given string to the currently selected language.
	 * `args` are optional arguments which will replace the first (second, third, ...) occurence of `%s` in the translation string.
	 */
	translate(word: string, ...args: string[]): string;
}
```

## Example

```tsx
import React from "react";
import { useI18n } from "iobroker-react/hooks";

const ExampleComponent: React.FC = () => {
	// You can abbreviate the `translate` function name, here to `_`.
	const { translate: _ } = useI18n();

	// Render a <div> with the translated version of "Hello world!"
	return <div>{_("Hello world!")}</div>;
};
```
