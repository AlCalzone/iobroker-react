import TreeTableRA from "@iobroker/adapter-react-v5/Components/TreeTable";
import type { CSSProperties } from "@mui/styles";
import React from "react";
import { useConnection } from "../hooks/useConnection";

export interface TreeColumnEditComponentProps {
	value: any;
	rowData: TreeTableRow;
	onChange: (newData: TreeTableRow) => void;
}

export interface TreeColumnProps {
	/** The title of this column */
	title: string;
	/** Which edit field should be used for this column */
	type?: "string" | "numeric" | "boolean" | "oid" | "color";

	/** Name of this column's field */
	field: string;
	/** Name of this column's sub-field (optional) */
	subField?: string;

	/** CSS style overrides for the header */
	headerStyle?: CSSProperties;
	/** CSS style overrides for cells */
	cellStyle?: CSSProperties;
	/** CSS style overrides for sub-field blocks */
	subStyle?: CSSProperties;

	/** Whether this column is editable. Default: `true` */
	editable?: boolean;
	/** Whether this column is hidden. Default: `false` */
	hidden?: boolean;
	/** Can be used to provide a custom edit component */
	editComponent?: (props: TreeColumnEditComponentProps) => JSX.Element;

	/** When set, a dropdown will be rendered to edit this field */
	options?: Record<string, any>;
	/** When set, a dropdown will be rendered to edit this column's sub-field */
	subFieldOptions?: Record<string, any>;
}

export interface TreeTableRow {
	id: string;
	/** Used to nest this row inside another one */
	parentId?: string;
	/** The data for this row */
	[field: string]: any;
}

export interface TreeTableProps {
	/** The name under which the table data gets saved in localStorage */
	name?: string;

	/** Definitions for all columns */
	columns: TreeColumnProps[];
	/** The data to display */
	data: TreeTableRow[];

	/** Gets called when the ADD button is clicked. The parent component must handle adding a new row. */
	onAdd?: () => void;
	/** Gets called when the data was updated */
	onChange?: (data: TreeTableRow[]) => void;

	/** Whether adding new rows is enabled. Requires `allowEdit` to be `true`. Default: `true` */
	allowAdd?: boolean;
	/** Whether editing existing rows is enabled. Default: `true` */
	allowEdit?: boolean;
	/** Whether sorting is enabled. Default: `true` */
	allowSorting?: boolean;
	/** Whether deleting existing rows is enabled. Default: `true` */
	allowDelete?: boolean;

	/** CSS class of the rendered table */
	className?: string;
	/** If true, the row is highlighted when the value is changed */
	glowOnChange?: boolean;

	/** Indentation between levels in pixels */
	indentation?: number;
}

// adapter-react has some weird naming choices, so we rename the column props here
function treeColumnPropsToRA(columns: TreeColumnProps[]): (Omit<
	TreeColumnProps,
	"options" | "subFieldOptions"
> & {
	lookup?: Record<string, any>;
	subLookup?: Record<string, any>;
})[] {
	return columns.map((props) => {
		const { options, subFieldOptions, ...rest } = props;
		return {
			...rest,
			lookup: options,
			subLookup: subFieldOptions,
		};
	});
}

export const TreeTable: React.FC<TreeTableProps> = (props): JSX.Element => {
	const {
		allowEdit = true,
		allowAdd = true,
		allowSorting = true,
		allowDelete = true,
		onAdd,
		onChange,
		data,
	} = props;

	const connection = useConnection();

	// A row was added or edited, react accordingly
	const handleUpdate = React.useCallback(
		(
			...args:
				| [rowAdded: true]
				| [newItem: TreeTableRow, oldItem: TreeTableRow]
		) => {
			if (args.length === 1) {
				// A new row was added, let the parent component handle it
				onAdd?.();
			} else {
				// An existing row was edited, replace it in the data array
				const [newItem, oldItem] = args;
				const index = data.findIndex((item) => item.id === oldItem.id);
				if (index !== -1) {
					// And notify the parent component. This should re-render this one
					const newData = [...data];
					newData[index] = newItem;
					onChange?.(newData);
				}
			}
		},
		[onAdd, onChange, data],
	);

	// A row was deleted, notify the parent component
	const handleDelete = React.useCallback(
		(oldItem: TreeTableRow) => {
			const index = data.findIndex((item) => item.id === oldItem.id);
			if (index !== -1) {
				onChange?.(data.filter((_, i) => i !== index));
			}
		},
		[data, onChange],
	);

	const columns = React.useMemo(() => {
		return treeColumnPropsToRA(props.columns);
	}, [props.columns]);

	return (
		<TreeTableRA
			name={props.name}
			columns={columns}
			data={data}
			noAdd={!(allowEdit && allowAdd)}
			noSort={!allowSorting}
			onUpdate={allowEdit ? handleUpdate : undefined}
			onDelete={allowDelete ? handleDelete : undefined}
			className={props.className}
			levelShift={props.indentation}
			socket={connection}
			glowOnChange={props.glowOnChange}
		/>
	);
};
