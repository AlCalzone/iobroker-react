import type { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import type { SxProps } from "@mui/system";
import React from "react";

export interface NumberInputProps {
	label?: string; // Label for the input field
	value?: number; // Value of the input field
	defaultValue?: number; // Default value of the input field
	onChange: (value: number) => void; // Callback when the value changes
	required?: boolean; // Is the input field required?
	max?: number; // Maximum value
	min?: number; // Minimum value
	step?: number; // Step size
	variant?: "standard" | "filled" | "outlined"; // Variant of the input field
	classNames?: Partial<{
		// Class names for the input field
		input: string;
		inputProps: string;
		helperText: string;
	}>;
	sx?: Partial<{
		// Style for the input field
		input: SxProps<Theme>;
		inputProps: SxProps<Theme>;
		helperText: SxProps<Theme>;
	}>;
	textAlign?: "left" | "center" | "right"; // Text alignment
	margin?: "none" | "dense" | "normal"; // Margin
	color?: "error" | "primary" | "secondary" | "info" | "success" | "warning"; // Color
	disabled?: boolean; // Is the input field disabled?
	error?: boolean; // Is the input field in error state?
	helperText?: string; // Helper text for the input field
}

export const NumberInput: React.FC<NumberInputProps> = (props): JSX.Element => {
	// State for the value of the input field
	const [values, setValues] = React.useState<number>(
		props.value || props.defaultValue || 0,
	);

	// Handle change of the input field
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value);
		if (isNaN(newValue)) {
			setValues(0);
			return;
		}
		if (props.min !== undefined && newValue < props.min) {
			setValues(props.min);
			props.onChange?.(props.min);
		} else if (props.max !== undefined && newValue > props.max) {
			setValues(props.max);
			props.onChange?.(props.max);
		} else {
			setValues(newValue);
			props.onChange?.(newValue);
		}
	};

	return (
		<React.Fragment>
			<TextField
				variant={props.variant || "outlined"}
				type={"number"}
				label={props.label}
				value={values}
				fullWidth
				color={props.color || "primary"}
				error={props.error || false}
				FormHelperTextProps={{
					className: props.classNames?.helperText,
					sx: props.sx?.helperText,
					disabled: props.disabled,
				}}
				InputProps={{
					className: props.classNames?.inputProps,
					inputProps: {
						step: props.step || 1,
						style: {
							textAlign: props.textAlign || "left",
						},
					},
					sx: props.sx?.inputProps,
				}}
				sx={props.sx?.input}
				helperText={props.helperText}
				required={props.required || false}
				disabled={props.disabled || false}
				className={props.classNames?.input}
				onChange={handleChange}
			/>
		</React.Fragment>
	);
};
