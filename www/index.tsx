import React from "react";
import ReactDOM from "react-dom";
import { IoBrokerApp } from "../src/index";

const Root: React.FC = React.memo(() => {
	// const [value, setValue] = React.useState(0);

	return (
		<>
			<h1>Test page for development</h1>
			Hello World!
		</>
	);
});

ReactDOM.render(
	<IoBrokerApp name={"debug"} port={8084}>
		<Root />
	</IoBrokerApp>,
	document.getElementById("root"),
);
