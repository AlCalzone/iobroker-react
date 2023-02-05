import Button from "@mui/material/Button";
import React from "react";
import ReactDOM from "react-dom";
import { IoBrokerApp, useDialogs, useIoBrokerState } from "../src/index";

const Root: React.FC = React.memo(() => {
	const { showSelectId } = useDialogs();

	const [stateId, setStateId] = React.useState<string>(
		"system.host.dev-tradfri-DESKTOP-OCULUR0.uptime",
	);
	const [state] = useIoBrokerState({
		id: stateId ?? "_none",
	});

	// This will be called when the button is clicked and ask the user if they want to do this
	const askUser = React.useCallback(async () => {
		const selected = await showSelectId({
			title: "Select an ID",
		});
		setStateId(selected!);
	}, [showSelectId]);

	return (
		<>
			<p>
				<Button color="primary" variant="contained" onClick={askUser}>
					Select an ID!
				</Button>
			</p>
			<br />
			Selected ID: {stateId ?? "none"}
			<br />
			Value: {state ?? "undefined"}
		</>
	);
});

ReactDOM.render(
	<IoBrokerApp name={"debug"}>
		<Root />
	</IoBrokerApp>,
	document.getElementById("root"),
);
