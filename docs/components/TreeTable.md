# `TreeTable`

`TreeTable` is a component that displays a table view with tree structure.
You can `add` new rows, `edit` and `delete` existing rows and `sorting` of rows is available.
Currently, the following columnTypes are available: `string, number, oid, color, numeric, boolean, select`.

![TreeTable](../_images/TreeTable.png)
```ts
interface TreeColumnProps {
	title: string; // title of the column
	field: string;  // field name of the column
	cellStyle?: object; // style of the cell
	editComponent?: (props: any) => void; // custom edit component
	headerStyle?: object; // style of the header
	hidden?: boolean; // hide column
	lookup?: object; // lookup object for select type
	editable?: true | false; // is column editable
	type?: "string" | "numeric" | "boolean" | "oid" | "color"; // type of the column
	subStyle?: object; // style of the subcell
	subLookup?: object;  // lookup object for subcell
	subField?: string; // field name of the subcell
}

interface TreeDataProps {
	id: string; // unique id of the row
	[field: string]: any;
}

interface TreeTableProps {
	name?: string; // name of table to save settings in localStorage
	columns: TreeColumnProps[]; // Array of columns
	data: TreeDataProps[]; // Array of data
	newLineData?: TreeDataProps; // default data for new line
	newData?: (data: TreeDataProps[]) => void; // callback for new data
	noAdd?: boolean; // If true, the add button is not displayed
	noDelete?: boolean; // If true, the delete button is not displayed
	noEdit?: boolean; // If true, the edit button is not displayed
	noSort?: boolean; // If true, the sort funktion is not available
	className?: string; // CSS class of the table
	glowOnChange?: boolean; // If true, the row is highlighted when the value is changed
	socket?: any; // Socket to use for the oid column only
	levelShift?: number; // Shift in pixels for every level
}
```

### `add Button`
If you want to create a new line, you have to set the `newLineData` property. This will be used when clicking the `+` button to create a new line.
After creating a new line the `newData` callback function is called. This function gets the new array with the data as parameter.
If you don't need the add button, you can hide it with the `noAdd` property, which must be set to `true`.

### `edit Button`
If you want to edit a line, you have to set the `editable` property of the column to `true`.
After editing a line the `newData` callback function is called. This function gets the new array with the data as parameter.
If you don't need the edit button, you can hide it with the `noEdit` property, which must be set to `true`.

### `delete Button`
After deleting a line the `newData` callback function is called. This function gets the new array with the data as parameter.
If you don't need the delete button, you can hide it with the `noDelete` property, which must be set to `true`.

## `Example`
```tsx
import React from "react";
import { TreeTable, TreeDataProps } from "iobroker-react";
import { useConnection } from "iobroker-react/hooks";

const columns: TreeColumnProps[] = [
	{
		title: "Name",
		field: "fieldIdInData",
		editable: true,
		subStyle: { color: "#00FF00" },
		subField: "subFieldData",
	},
	{ title: "Text", field: "text", editable: true, type: "string" },
	{ title: "OID", field: "oid", editable: true, type: "oid" },
	{ title: "Color", field: "color", editable: true, type: "color" },
	{ title: "Numeric", field: "numeric", editable: true, type: "numeric" },
	{ title: "Boolean", field: "boolean", editable: true, type: "boolean" },
	{
		title: "Select",
		field: "select",
		editable: true,
		type: "string",
		lookup: { 1: "one", 2: "two", 3: "three" },
	},
];

const newLine = {
	id: Math.random().toString(36).substr(2, 9), // create random id
	fieldIdInData: "your data",
	oid: "myOID",
	color: "#ff0000",
	numeric: 123,
	select: "number",
	boolean: true,
	text: "your data",
};

const ExampleComponent: React.FC = () => {
	const connection = useConnection();
	const [treeData, setTreeData] = React.useState<TreeDataProps[]>([
		{
			id: "1",
			fieldIdInData: "Test1",
			oid: "test.0.test1",
			color: "#ff0000",
			numeric: 1,
			text: "Text1",
			boolean: true,
			select: "1",
		},
		{
			id: "2",
			fieldIdInData: "Test2",
			oid: "test.0.test2",
			color: "#00ff00",
			numeric: 2,
			text: "Text2",
			parentId: "1",
			subFieldData: "Child",
			boolean: false,
			select: "2",
		},
		{
			id: "3",
			fieldIdInData: "Test3",
			oid: "test.0.test3",
			color: "#0000ff",
			numeric: 3,
			text: "Text3",
			boolean: true,
			select: "3",
		},
	]);
  
	return (
		<div>
			<TreeTable
				name="exampleTable"
				columns={columns}
				data={treeData}
				newLineData={newLine}
				newData={(data: TreeDataProps[]) => setTreeData(data)}
				noAdd={false}
				noEdit={false}
				noSort={false}
				noDelete={false}
				className={undefined}
				levelShift={20}
				socket={connection}
				glowOnChange={true}
			/>
		</div>
	);
};
```
