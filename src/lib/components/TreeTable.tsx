import TreeTableRA from "@iobroker/adapter-react-v5/Components/TreeTable";
import React from "react";

export interface TreeColumnProps {
	title: string;
	field: string;
	cellStyle?: object;
	editComponent?: (props: any) => void;
	headerStyle?: object;
	hidden?: boolean;
	lookup?: object;
	editable?: true | false;
	type?: "string" | "numeric" | "boolean" | "oid" | "color";
	subStyle?: object;
	subLookup?: object;
	subField?: string;
}

export interface TreeDataProps {
	id: string;
	[field: string]: any;
}

export interface TreeTableProps {
	name?: string;
	columns: TreeColumnProps[];
	data: TreeDataProps[];
	newLineData?: TreeDataProps;
	newData?: (data: TreeDataProps[]) => void;
	noAdd?: boolean;
	noEdit?: boolean;
	noSort?: boolean;
	className?: string;
	glowOnChange?: boolean;
	socket?: any; // only if oid type is used
	noDelete?: boolean;
	levelShift?: number; // Shift in pixels for every level
}

export const TreeTable: React.FC<TreeTableProps> = (props): JSX.Element => {
	// function for creating new datasets and editing existing ones
	const handleUpdate = (newData: boolean, oldData: TreeDataProps) => {
		// Added new line
		const data = JSON.parse(JSON.stringify(props.data));
		if (newData === true) {
			const newLine = props.newLineData;
			data.push(newLine);
		} else {
			// edit existing line
			const index = data.findIndex(
				(item: { id: string }) => item.id === oldData.id,
			);
			data[index] = newData;
		}
		if (props.newData) props.newData(data);
	};

	const handleDelete = (oldData: any) => {
		console.log(`Delete: ${JSON.stringify(oldData)}`);
		const pos = props.data.indexOf(oldData);
		if (pos !== -1) {
			const data = JSON.parse(JSON.stringify(props.data));
			data.splice(pos, 1);
			if (props.newData) props.newData(data);
		}
	};

	return (
		<TreeTableRA
			name={props.name}
			columns={props.columns}
			data={props.data}
			noAdd={props.noAdd}
			noSort={props.noSort}
			className={props.className}
			levelShift={props.levelShift}
			socket={props.socket}
			glowOnChange={props.glowOnChange}
			onUpdate={props.noEdit === false ? handleUpdate : undefined}
			onDelete={props.noDelete === false ? handleDelete : undefined}
		/>
	);
};
