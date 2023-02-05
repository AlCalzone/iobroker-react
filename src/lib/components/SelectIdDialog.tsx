import type {
	ObjectBrowserColumn,
	ObjectBrowserCustomFilter,
	ObjectBrowserType,
} from "@iobroker/adapter-react-v5/Components/types";
import SelectIdRA from "@iobroker/adapter-react-v5/Dialogs/SelectID";
import * as React from "react";
import { useConnection } from "../hooks/useConnection";

export interface SelectIdDialogProps {
	isOpen?: boolean;

	title?: string;
	/** Set to true to allow the selection of multiple IDs. */
	multiSelect?: boolean;
	/** Show folders before any leaves. */
	foldersFirst?: boolean;
	/** Show the expert button? */
	showExpertButton?: boolean;

	/** Which columns to display. Default: `['name', 'type', 'role', 'room', 'func', 'val']` */
	columns?: ObjectBrowserColumn[];
	/** Which object types to show. Default: `['state']` */
	objectTypes?: ObjectBrowserType[];
	/** Custom filter for the object browser */
	customFilter?: ObjectBrowserCustomFilter;

	/** Which ID(s) to preselect when opening the dialog */
	selected?: string | string[];

	okButtonText?: string;
	okButtonClick: (selected: string | string[] | undefined) => void;
	cancelButtonText?: string;
	cancelButtonClick: () => void;

	classNames?: Partial<{
		headerID: string;
		dialog: string;
		content: string;
	}>;
}

export type SelectIdDialogState = {
	isOpen: boolean;
} & Omit<SelectIdDialogProps, "isOpen">;

export type ShowSelectId = <Multi extends boolean = false>(
	options?: Pick<
		SelectIdDialogProps,
		| "title"
		| "foldersFirst"
		| "showExpertButton"
		| "columns"
		| "objectTypes"
		| "customFilter"
		| "okButtonText"
		| "cancelButtonText"
		| "classNames"
	> & {
		multiSelect?: Multi;
		selected?: string;
	},
) => Multi extends true
	? Promise<string[] | undefined>
	: Multi extends false
	? Promise<string | undefined>
	: Promise<string | string[] | undefined>;

export const SelectIdDialog: React.FC<SelectIdDialogProps> = (props) => {
	const { cancelButtonClick } = props;

	const connection = useConnection();

	const [isOpen, setOpen] = React.useState(props.isOpen ?? false);
	// Using useEffect is necessary to update isOpen when the props change later
	React.useEffect(() => {
		setOpen(props.isOpen ?? false);
	}, [props.isOpen]);

	const handleClose = React.useCallback(() => {
		setOpen(false);
		cancelButtonClick();
	}, [cancelButtonClick]);

	if (!isOpen) return <></>;

	return (
		<SelectIdRA
			// @ts-expect-error Probably a problem in RA's typedefs
			socket={connection}
			imagePrefix="../.." // TODO: necessary?
			title={props.title}
			multiSelect={props.multiSelect}
			foldersFirst={props.foldersFirst}
			showExpertButton={props.showExpertButton}
			columns={props.columns}
			types={props.objectTypes}
			customFilter={props.customFilter}
			selected={props.selected}
			ok={props.okButtonText}
			onOk={props.okButtonClick}
			onClose={handleClose}
			cancel={props.cancelButtonText}
			// @ts-expect-error Probably a problem in RA's typedefs
			classes={props.classNames}
		/>
	);
};
