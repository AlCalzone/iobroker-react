# `NumberInput`

A component that allows the user to enter a number.

```ts
import { NumberInput } from "iobroker-react/components";
```
```tsx
interface NumberInputProps {
	label?: string; // Label for the input field 
	value?: number; // Value of the input field 
	defaultValue?: number; // Default value of the input field
	onChange: (value: number) => void; // Callback when the value changes
	required?: boolean; // Is the input field required?
	max?: number; // Maximum value of the input field 
	min?: number; // Minimum value of the input field
	step?: number; // Step size for the input field (default: 1)
	variant?: "standard" | "filled" | "outlined"; // Variant of the input field (default: "outlined")
	classNames?: Partial<{
		// Class names for the input field
		input: string; // Class name for the input field
		inputProps: string; // Class name for the input field props
		helperText: string; // Class name for the helper text
	}>;
	sx?: Partial<{
		// Style for the input field mui-v5 only
		input: SxProps<Theme>; // Style for the input field
		inputProps: SxProps<Theme>; // Style for the input field props
		helperText: SxProps<Theme>; // Style for the helper text
	}>;
	textAlign?: "left" | "center" | "right"; // Text alignment of the input field (default: "left")
	margin?: "none" | "dense" | "normal"; // Margin of the input field (default: "none")
	color?: "error" | "primary" | "secondary" | "info" | "success" | "warning"; // Color
	disabled?: boolean; // Is the input field disabled?
	error?: boolean; // Is the input field in error state?
	helperText?: string; // Helper text for the input field
}
```

The `onChange` function is called when the value of the input field changes. The `onChange` function returns the new value of the input field.\
The `value` prop is used to set the value of the input field. If the `value` prop is not set, the input field is empty.

With the `defaultValue` property you can set a default value for the input field.\
With the properties `min` and `max` you can set a minimum and maximum value for the input field.\
And with the property `step` you can set a step size for the input field.

The `classNames` prop can be used to control the CSS classes of the input field and the show/hide button.\
You can use the `classNames` with the `style.css` or with the `makeStyles` function of Material UI.\
The `classNames` prop has the following properties:
- `input` - CSS class for the input field (e.g. with `useStyles` => `input={{ classes.input }}` or with `style.css` => `input={{ className: "my-input" }}`)
- `inputProps` - CSS class for the input field props
- `helperText` - CSS class for the helper text.

The `sx` prop can be used to control the style of the input field and the show/hide button only for mui-v5. The sx prop has the following properties:
  - same as `classNames`

The `textAlign` prop can be used to control the text alignment of the input field.



## Example

```tsx
import React from "react";
import { NumberInput, NumberInputProps } from "iobroker-react/components";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	input: {
		width: "200px !important",
	},
}));

interface NumberInputExampleProps {
	native: ioBroker.AdapterConfig;
	onChange: (attr: string, value: number) => void;
}

export const NumberInputExample: React.FC<NumberInputExampleProps>
= (props): JSX.Element => {
	const classes = useStyles();
	const [error, setError] = React.useState<{
		message: string;
		error: boolean;
		color: NumberInputProps["color"];
	}>({
		message: "Number must be between 0 and 100",
		error: false,
		color: "primary",
	});

    // example function to check if the value is valid and update your database
	const handleNumberInput = (value: number) => {
		if (value > 100) {
			setError({
				...error,
				message: "Number must be less than 100",
				error: true,
				color: "error",
			});
      
		} else {
			setError({
				...error,
				message: "Number must be between 0 and 100",
				error: false,
				color: "success",
			});
      	     
		}
		props.onChange("number_input", value);   // update your database with the new value
	};

	return (
            <div>
				<NumberInput
					variant={"outlined"}  
					label={"Number Input"}
					value={props.native.number_input}
					defaultValue={0}
					onChange={handleNumberInput}
					color={error.color}
					error={error.error}
					helperText={error.message}
					// sx={{ width: "200px" }} // mui-v5 only
					classNames={{ input: classes.input}} // mui-v4 or mui-v5
					min={0}
					max={200}
					step={1}
					textAlign={"center"}
				/>
            </div>
		);
}
```


