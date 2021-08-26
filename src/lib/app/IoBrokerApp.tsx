/* eslint-disable @typescript-eslint/no-empty-function */
import { Connection, ConnectionProps } from "@iobroker/socket-client";
import { ThemeProvider } from "@material-ui/core";
import { extend } from "alcalzone-shared/objects";
import React from "react";
import type { ModalState, ShowModal } from "../components/ModalDialog";
import { ModalDialog } from "../components/ModalDialog";
import type {
	NotificationState,
	ShowNotification,
} from "../components/Notification";
import { Notification } from "../components/Notification";
import { ConnectionContext } from "../hooks/useConnection";
import { DialogsContext } from "../hooks/useDialogs";
import { GlobalsContext } from "../hooks/useGlobals";
import { defaultTranslations, I18n, I18nContext, Translations } from "../i18n";
import type { ThemeType as ThemeName } from "../shared/theme";
import getTheme from "../shared/theme";

(window as any)._ ??= (a: any) => a;

// layout components
export interface IoBrokerAppProps {
	name: ConnectionProps["name"];
	theme?: ThemeName;
	translations?: Translations;
}

const ThemeSwitcherContext = React.createContext<(theme: ThemeName) => void>(
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	() => {},
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useThemeSwitcher = () => React.useContext(ThemeSwitcherContext);

/**
 * The basis for all ioBroker apps. Wrap your app in this component. Example:
 * ```tsx
 * import { IoBrokerApp } from "iobroker-react/app";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   // do your thing...
 *
 *   return (
 *     <div>Hello World!</div>
 *   );
 * };
 *
 * const MyApp: React.FC = () => {
 *   // This will render your component once the backend is connected
 *   return (
 *     <MyComponent name="my-adapter">
 *       <MyAppContent prop1="foo" />
 *     </IoBrokerApp>
 *   );
 * };
 * ```
 */
export const IoBrokerApp: React.FC<IoBrokerAppProps> = (props) => {
	const { name, theme = "light", translations = {} } = props;

	// Manage translations
	const [i18nInstance, setI18nInstance] = React.useState<I18n>({} as any);
	const {
		language,
		setLanguage,
		extendTranslations,
		setTranslations,
		translate,
	} = i18nInstance;

	// Manage connection
	const [connection, setConnection] = React.useState<Connection>();
	React.useEffect(() => {
		const _connection = new Connection({
			name,
			onReady: () => {
				// Setup translations first
				const i18n = new I18n(
					extend({}, defaultTranslations, translations),
				);
				i18n.setLanguage(_connection.systemLang);
				setI18nInstance(i18n);

				// because this will cause all child components to be rendered
				setConnection(_connection);
			},
			onError: (err) => {
				console.error(err);
			},
		});
	}, [name, translations]);

	// Manage themes
	const [themeName, setThemeName] = React.useState<ThemeName>(theme);
	const themeInstance = getTheme(themeName);

	// Manage globals
	const adminConfigMatch =
		/config\/system\.adapter\.(?<adapter>[^\.]+)\.(?<instance>\d+)/i.exec(
			window.location.hash,
		); // tab-instances/config/system.adapter.zwave2.0
	const tabRegexMatch = /adapter\/(?<adapter>[^\/]+)/i.exec(
		window.location.pathname,
	); // /adapter/zwave2/tab_m.html?instance=0
	const adapter =
		adminConfigMatch?.groups?.adapter ??
		tabRegexMatch?.groups?.adapter ??
		"admin"; // ???
	const instance = parseInt(
		new URLSearchParams(window.location.search).get("instance") ??
			adminConfigMatch?.groups?.instance ??
			tabRegexMatch?.groups?.instance ??
			"0",
		10,
	);
	const namespace = `${adapter}.${instance}` as const;

	// Simplify access to dialogs and notifications
	const [notificationState, setNotificationState] =
		React.useState<NotificationState>({
			isOpen: false,
			message: "",
			variant: "info",
		});
	const [modalState, setModalState] = React.useState<ModalState>({
		isOpen: false,
		title: "",
		message: "",
		showYesButton: true,
		yesButtonText: "Ja",
		showNoButton: true,
		noButtonText: "Nein",
		onClose: () => {},
		yesButtonClick: () => {},
		noButtonClick: () => {},
	});

	const showNotification: ShowNotification = (message, variant, timeout) => {
		setNotificationState({
			isOpen: true,
			message,
			variant,
			timeout,
		});
	};
	const hideNotification = () => {
		setNotificationState({ ...notificationState, isOpen: false });
	};

	const hideModal = () => {
		setModalState((modalState) => ({ ...modalState, isOpen: false }));
	};
	const showModal: ShowModal = (title, text, options) => {
		return new Promise((resolve) => {
			setModalState({
				isOpen: true,
				title,
				message: text,
				onClose: () => {
					hideModal();
					resolve(false);
				},
				showYesButton: options?.showYesButton ?? true,
				yesButtonText: options?.yesButtonText ?? "Ja",
				showNoButton: options?.showNoButton ?? true,
				noButtonText: options?.noButtonText ?? "Nein",

				yesButtonClick: () => {
					hideModal();
					resolve(true);
				},
				noButtonClick: () => {
					hideModal();
					resolve(false);
				},
			});
		});
	};

	return (
		<GlobalsContext.Provider value={{ adapter, instance, namespace }}>
			<ThemeSwitcherContext.Provider value={setThemeName}>
				<ThemeProvider theme={themeInstance}>
					{connection ? (
						<ConnectionContext.Provider value={connection}>
							<I18nContext.Provider
								value={{
									language,
									setLanguage,
									extendTranslations,
									setTranslations,
									translate,
								}}
							>
								<DialogsContext.Provider
									value={{
										showNotification,
										showModal,
										hideModal,
									}}
								>
									{props.children}

									{/* TODO: Maybe memo these: */}
									<Notification
										{...notificationState}
										onClose={hideNotification}
									/>
									<ModalDialog {...modalState} />
								</DialogsContext.Provider>
							</I18nContext.Provider>
						</ConnectionContext.Provider>
					) : (
						<>loading...</>
					)}
				</ThemeProvider>
			</ThemeSwitcherContext.Provider>
		</GlobalsContext.Provider>
	);
};
