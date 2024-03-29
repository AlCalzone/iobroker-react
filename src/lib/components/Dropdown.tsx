import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectProps } from "@mui/material/Select";
import * as React from "react";

export interface DropdownOption {
	value: any;
	label: string;
}

export type DropdownProps = {
	label: string;
	options?: DropdownOption[];
	selectedOption: any;
	noOptionsMessage?: string;
	placeholder?: string;
} & Partial<SelectProps>;

export const Dropdown: React.FC<DropdownProps> = (props) => {
	const {
		label,
		options,
		selectedOption,
		noOptionsMessage,
		placeholder,
		...otherProps
	} = props;
	const hasOptions = !!options && options.length;
	const showNoOptionsMessage = !hasOptions && !!noOptionsMessage;

	let value: any;
	if (options?.length) value = selectedOption;

	return (
		<Select
			value={value ?? ""}
			input={<OutlinedInput />}
			displayEmpty
			margin="dense"
			{...otherProps}
		>
			<MenuItem value="" disabled>
				{placeholder ?? ""}
			</MenuItem>
			{options &&
				options.length &&
				options.map(({ value, label }) => (
					<MenuItem key={value} value={value}>
						{label}
					</MenuItem>
				))}
			{showNoOptionsMessage && (
				<MenuItem key="__empty" value="__empty" disabled>
					{noOptionsMessage}
				</MenuItem>
			)}
		</Select>
	);
};
