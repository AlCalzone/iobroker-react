import React from "react";
import { IoBrokerApp, IoBrokerAppProps } from "./IoBrokerApp";
import { useIoBrokerObject } from "../hooks/useIoBrokerObject";
import { decrypt } from "../shared/tools";

export interface SettingsAppProps extends IoBrokerAppProps {
	afterLoad?(settings: Record<string, any>): Record<string, any>;
	beforeSave?(settings: Record<string, any>): Record<string, any>;
	encryptedFields?: string[];
}

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

const SettingsAppContent: React.FC<Omit<SettingsAppProps, "name">> = (
	props,
) => {
	const [settings, setSettings] = React.useState<Record<string, any>>({});

	const systemConfigObj = useIoBrokerObject("system.config");
	// const systemConfig = systemConfigObj?.common;
	const secret = systemConfigObj?.native?.secret || "Zgfr56gFe87jJOM";

	// Parse and decrypt settings when instance object is loaded or changed
	const instanceObj = useIoBrokerObject(`system.adapter.${namespace}`);
	React.useEffect(() => {
		if (instanceObj) {
			let settings = parseSettings(
				instanceObj,
				props.encryptedFields ?? [],
				secret,
			);
			if (typeof props.afterLoad === "function") {
				settings = props.afterLoad(settings);
			}
			setSettings(settings);
		}
	}, [instanceObj, props, secret]);
	// TODO: Timeout when loading settings fails

	return settings ? (
		<pre>{JSON.stringify(settings, null, 4)}</pre>
	) : (
		<div>Loading settings...</div>
	);
};

export const SettingsApp: React.FC<SettingsAppProps> = ({ name, ...props }) => {
	return (
		<IoBrokerApp name={name}>
			<SettingsAppContent {...props} />
		</IoBrokerApp>
	);
};
