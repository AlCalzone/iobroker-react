import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import Loader from "../components/Loader";
import SaveCloseButtons from "../components/SaveCloseButtons";
import { useIoBrokerObject } from "../hooks/useIoBrokerObject";
import { decrypt } from "../shared/tools";
import { IoBrokerApp, IoBrokerAppProps } from "./IoBrokerApp";

export interface SettingsAppProps extends IoBrokerAppProps {
	afterLoad?(settings: Record<string, any>): void;
	beforeSave?(settings: Record<string, any>): boolean | undefined;
	encryptedFields?: string[];
}

interface ISettingsContext<
	T extends Record<string, any> = Record<string, any>,
> {
	settings: T;
	setSettings: React.Dispatch<React.SetStateAction<T>>;
	setError: (hasError: boolean) => void;
}

const SettingsContext = React.createContext<ISettingsContext>({} as any);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSettings = <T extends Record<string, any>>() =>
	React.useContext(SettingsContext) as ISettingsContext<T>;

function parseSettings(
	obj: ioBroker.InstanceObject,
	encryptedFields: string[],
	secret: string,
): Record<string, any> {
	const settings: Record<string, any> = { ...obj.native };
	for (const field of encryptedFields) {
		if (typeof settings[field] === "string") {
			settings[field] = decrypt(secret, settings[field]);
		}
	}
	return settings;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexFlow: "column nowrap",
			height: "100%",
		},
		main: {
			flex: "1 1 auto",
		},
		buttons: {
			flex: "0 0 auto",
		},
	}),
);

const closeSettingsWindow = () => {
	if (typeof window.parent !== "undefined" && window.parent) {
		const iframeDialog = (window.parent as any).$iframeDialog;
		try {
			if (typeof iframeDialog?.close === "function") {
				iframeDialog.close();
			} else {
				window.parent.postMessage("close", "*");
			}
		} catch (e) {
			window.parent.postMessage("close", "*");
		}
	}
};

const SettingsAppContent: React.FC<Omit<SettingsAppProps, "name">> = (
	props,
) => {
	const [settings, setSettings] = React.useState<Record<string, any>>();

	const [systemConfigObj] = useIoBrokerObject("system.config");
	// const systemConfig = systemConfigObj?.common;
	const secret = systemConfigObj?.native?.secret || "Zgfr56gFe87jJOM";

	// Parse and decrypt settings when instance object is loaded or changed
	const [instanceObj, extendInstanceObj] = useIoBrokerObject(
		`system.adapter.${namespace}`,
	);
	const [originalSettings, setOriginalSettings] =
		React.useState<Record<string, any>>();
	React.useEffect(() => {
		if (instanceObj) {
			const settings = parseSettings(
				instanceObj,
				props.encryptedFields ?? [],
				secret,
			);
			// Transform loaded settings if desired
			if (typeof props.afterLoad === "function") {
				props.afterLoad(settings);
			}
			setSettings(settings);
			setOriginalSettings({ ...settings });
		}
	}, [instanceObj, props, secret]);
	// TODO: Timeout when loading settings fails

	// Detect changes
	const [changed, setChanged] = React.useState(false);
	React.useEffect(() => {
		// There's probably a more perfomant way to do this but this is good enough for now
		setChanged(
			JSON.stringify(settings) !== JSON.stringify(originalSettings),
		);
	}, [originalSettings, settings]);

	// Detect errors
	const [hasErrors, setHasErrors] = React.useState(false);

	// Update settings (and close window) when save buttons are clicked
	const onSave = async (close: boolean) => {
		const newNative = { ...originalSettings, ...settings };
		// Transform settings before saving if desired, giving the dev a chance to abort
		if (
			typeof props.beforeSave === "function" &&
			props.beforeSave(newNative) === false
		) {
			return;
		}

		try {
			await extendInstanceObj({ native: newNative });
			// Updating the settings worked
			setSettings(newNative);
			setOriginalSettings(newNative);
			if (close) closeSettingsWindow();
		} catch (e) {
			console.error(`Cannot save configuration: ${e}`);
		}
	};

	const classes = useStyles();
	return settings ? (
		<SettingsContext.Provider
			value={{ settings, setSettings, setError: setHasErrors }}
		>
			<div className={classes.root}>
				<div className={classes.main}>{props.children}</div>
				<div className={classes.buttons}>
					<SaveCloseButtons
						// isIFrame={true}
						noTextOnButtons={false}
						// noTextOnButtons={this.state.width === 'xs' || this.state.width === 'sm' || this.state.width === 'md'}
						changed={changed}
						hasErrors={hasErrors}
						onSave={onSave}
						onClose={closeSettingsWindow}
					/>
				</div>
			</div>
		</SettingsContext.Provider>
	) : (
		<Loader theme="dark" />
	);
};

export const SettingsApp: React.FC<SettingsAppProps> = ({ name, ...props }) => {
	return (
		<IoBrokerApp name={name}>
			<SettingsAppContent {...props} />
		</IoBrokerApp>
	);
};
