import LogoRA from "@iobroker/adapter-react-v5/Components/Logo";
import React from "react";
import { useDialogs } from "../hooks/useDialogs";
import { useGlobals } from "../hooks/useGlobals";
import { useIoBrokerObject } from "../hooks/useIoBrokerObject";

export interface SettingsHeaderProps {
	classes?: { buttons?: string; logo?: string };
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = (
	props,
): JSX.Element => {
	const { instance, namespace } = useGlobals();
	const { showNotification } = useDialogs();
	const [myObject, setObject] = useIoBrokerObject(
		`system.adapter.${namespace}`,
		{
			subscribe: false,
		},
	);

	const errorNotification = React.useCallback(
		(error: string) => {
			showNotification(error, "error");
		},
		[showNotification],
	);
	const successNotification = React.useCallback(
		(msg: string) => {
			showNotification(msg, "success");
		},
		[showNotification],
	);

	// Gets called after the user has imported a config backup
	const handleImportConfig = React.useCallback(
		(native: ioBroker.AdapterConfig) => {
			if (!myObject) return;
			setObject({
				...myObject,
				native,
			});
			successNotification("Configuration imported");
		},
		[myObject, setObject, successNotification],
	);

	return (
		<LogoRA
			instance={instance}
			common={myObject?.common ?? {}}
			native={myObject?.native ?? {}}
			onError={errorNotification}
			onLoad={handleImportConfig}
			classes={{
				buttons: props.classes?.buttons ?? "",
				logo: props.classes?.logo ?? "",
			}}
		/>
	);
};
