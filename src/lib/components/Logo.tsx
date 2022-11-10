import LogoRA from "@iobroker/adapter-react-v5/Components/Logo";
import React from "react";
import { useDialogs } from "../hooks/useDialogs";
import { useGlobals } from "../hooks/useGlobals";
import { useIoBrokerObject } from "../hooks/useIoBrokerObject";

interface LogoProps {
	classes?: { buttons?: string; logo?: string };
}

export const Logo: React.FC<LogoProps> = (props): JSX.Element => {
	const { instance, namespace } = useGlobals();
	const { showNotification } = useDialogs();
	const [myObject, setObject] = useIoBrokerObject(
		`system.adapter.${namespace}`,
		{
			subscribe: false,
		},
	);

	const errorNotification = React.useCallback(
		(error) => {
			showNotification(error, "error");
		},
		[showNotification],
	);
	const successNotification = React.useCallback(
		(msg) => {
			showNotification(msg, "success");
		},
		[showNotification],
	);

	const handleLoadConfig = (native: ioBroker.AdapterConfig) => {
		if (myObject)
			setObject({
				...myObject,
				native,
			});
		successNotification("Configuration loaded");
	};

	return (
		<LogoRA
			instance={instance}
			common={myObject ? myObject.common : {}}
			native={myObject ? myObject.native : {}}
			onError={(error: string) => errorNotification(error)}
			onLoad={(native: ioBroker.AdapterConfig) =>
				handleLoadConfig(native)
			}
			classes={{
				buttons: props.classes?.buttons ?? "",
				logo: props.classes?.logo ?? "",
			}}
		/>
	);
};
