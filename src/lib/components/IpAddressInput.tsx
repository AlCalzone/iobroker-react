import type { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import type { SxProps } from "@mui/system";
import React from "react";

export interface IpAddressInputProps {
	label?: string; // Label for the input field
	value?: string; // Value of the input field
	defaultValue?: string; // Default value of the input field
	onChange: (value: string, valid?: boolean) => void; // Callback when the value changes
	required?: boolean; // Is the input field required?
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
	maxLength?: number; // Maximum length of the input field (default: 15 for IPv4)
	textAlign?: "left" | "center" | "right"; // Text alignment
	margin?: "none" | "dense" | "normal"; // Margin
	color?: "error" | "primary" | "secondary" | "info" | "success" | "warning"; // Color
	disabled?: boolean; // Is the input field disabled?
	error?: boolean; // Is the input field in error state?
	helperText?: Partial<{
		default: string; // Helper text for the input field
		invalid: string; // Helper text for the input field when the value is invalid
		valid: string; // Helper text for the input field when the value is valid
	}>;
	placeholder?: string; // Placeholder for the input field
}

const allowedInputRegex = /^\d*\.?\d*\.?\d*\.?\d*$/;
const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?!$)|$)){4}$/; //regex from https://regex101.com/library/ChFXjy

export const IpAddressInput: React.FC<IpAddressInputProps> = (
	props,
): JSX.Element => {
	// State for the value of the input field
	const [ipAddress, setIpAddress] = React.useState<string>(
		props.value || props.defaultValue || "",
	);
	const [values, setValues] = React.useState<{
		error?: boolean;
		helperText?: string;
		color?: IpAddressInputProps["color"];
	}>({
		error: props.error || false,
		helperText: props.helperText?.default || "",
		color: props.color || "primary",
	});

	const handleIpAddress = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	): void => {
		const newValue = event.target.value;
		if (allowedInputRegex.test(newValue)) {
			const length = newValue.length;
			const index = newValue.lastIndexOf(".") + 1;
			let noOfDots = 0;
			noOfDots = newValue.split(".").length - 1;
			let updatedVal: string | any[];
			if (
				length !== index &&
				noOfDots < 3 &&
				ipAddress.length < length &&
				(length - index) % 3 == 0
			) {
				updatedVal = `${newValue}.`;
			} else if (noOfDots > 3 || length - index > 3) {
				updatedVal = newValue.substring(0, length - 1);
			} else {
				updatedVal = newValue;
			}

			setIpAddress(updatedVal);

			if (props.error) {
				if (updatedVal !== undefined || updatedVal !== "") {
					if (updatedVal?.match(ipRegex)) {
						// valid ip address
						setValues({
							...values,
							error: false,
							helperText: props.helperText?.valid,
							color: values.color,
						});
						props.onChange(updatedVal, true);
					} else {
						// invalid ip address
						setValues({
							...values,
							error: true,
							helperText: props.helperText?.invalid,
						});
						props.onChange(updatedVal, false);
					}
				}
			} else {
				props.onChange(updatedVal);
			}
		}
	};

	return (
		<React.Fragment>
			<TextField
				fullWidth
				variant={props.variant || "outlined"}
				type={"text"}
				label={props.label}
				value={ipAddress}
				color={values.color || "primary"}
				error={values.error || false}
				FormHelperTextProps={{
					className: props.classNames?.helperText,
					sx: props.sx?.helperText,
					disabled: props.disabled,
				}}
				InputProps={{
					className: props.classNames?.inputProps,
					inputProps: {
						maxLength: props.maxLength || 15,
						style: {
							textAlign: props.textAlign || "left",
						},
					},
					sx: props.sx?.inputProps,
				}}
				sx={props.sx?.input}
				helperText={values.helperText}
				required={props.required || false}
				disabled={props.disabled || false}
				className={props.classNames?.input}
				onChange={handleIpAddress}
				placeholder={props.placeholder}
			/>
		</React.Fragment>
	);
};
