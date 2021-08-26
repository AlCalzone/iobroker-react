/***
 * Copyright 2018-2019 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 ***/

import React from "react";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import nl from "./nl.json";
import pl from "./pl.json";
import pt from "./pt.json";
import ru from "./ru.json";
import zhCn from "./zh-cn.json";

export type TranslationDict = Record<string, string>;
export type Translations = { [lang in ioBroker.Languages]?: TranslationDict };

export const I18nContext = React.createContext<
	Pick<
		I18n,
		| "language"
		| "setLanguage"
		| "extendTranslations"
		| "setTranslations"
		| "translate"
	>
>({} as any);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useI18n = () => React.useContext(I18nContext);

export const defaultTranslations: Translations = {
	en,
	de,
	ru,
	pt,
	nl,
	fr,
	it,
	es,
	pl,
	"zh-cn": zhCn,
};

/**
 * Translation string management.
 */
export class I18n {
	public constructor(
		/**
		 * Dictionary of of all languages with their translations.
		 */
		private translations: Translations = {},
	) {
		// The methods are going to be passed around, so we bind them to the class instance
		this.setLanguage = this.setLanguage.bind(this);
		this.extendTranslations = this.extendTranslations.bind(this);
		this.setTranslations = this.setTranslations.bind(this);
		this.translate = this.translate.bind(this);
	}

	private _language: ioBroker.Languages = "en";
	public get language(): ioBroker.Languages {
		return this._language;
	}

	public setLanguage(language: ioBroker.Languages): void {
		this._language = language;
	}

	/**
	 * Add translations to the translation dictionary.
	 */
	public extendTranslations(translations: Translations): void {
		try {
			for (const [lang, dict] of Object.entries(translations) as [
				ioBroker.Languages,
				TranslationDict,
			][]) {
				if (!(lang in this.translations)) {
					console.warn(
						`extendTranslations called with unknown language: ${lang}`,
					);
				}
				this.translations[lang] ??= {};
				for (const [word, translation] of Object.entries(dict)) {
					const target = this.translations[lang]!;
					if (word in target) {
						console.warn(
							`Translation for "${word}" already exists in language ${lang}, ignored...`,
						);
					} else {
						target[word] = translation;
					}
				}
			}
		} catch (e) {
			console.error(`Cannot extend translation dictionary: ${e}`);
		}
	}

	/**
	 * Overrides the translations dictionary with the given one
	 */
	public setTranslations(translations: Translations): void {
		this.translations = translations;
	}

	/**
	 * Translate the given string to the selected language.
	 * @param {string} word The (key) word to look up the string.
	 * @param {string[]} args Optional arguments which will replace the first (second, third, ...) occurence of %s
	 */
	public translate(word: string, ...args: string[]): string {
		const translation = this.translations[this._language];
		// console.log(`translate ${word}: translation = ${translation?.[word]}`);
		if (translation) {
			const w = translation[word];
			if (w) {
				word = w;
			} else {
				// console.warn(`Translation missing: ${word}`);
			}
		}
		for (const arg of args) {
			word = word.replace("%s", arg);
		}
		return word;
	}
}
