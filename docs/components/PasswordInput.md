# `PasswordInput`

this is a Password Input component with a show/hide button to show the password.

```ts
import { PasswordInput } from "iobroker-react/components";
```

```ts
type PasswordColors = {
	iconOn:
		| "inherit"
		| "action"
		| "disabled"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
	iconOff:
		| "inherit"
		| "action"
		| "disabled"
		| "primary"
		| "secondary"
		| "error"
		| "info"
		| "success"
		| "warning";
	color: "primary" | "secondary" | "error" | "info" | "success" | "warning";
};
```

```tsx
interface PasswordInputProps {
	value: string;  // password value from the Native object
	onChange: (value: string) => void;  // onChange function returns the new password value
	classNames?: Partial<{  // CSS classes for the input field and the show/hide button
		formControl: string;
		input: string;
		filledInput: string;
		outlinedInput: string;
		inputLabel: string;
		inputAdornment: string;
		iconButton: string;
		iconOff: string;
		iconOn: string;
		helperText: string;
	}>;
	colors?: Partial<PasswordColors>; // colors for the input field and the show/hide button
	error?: boolean; // set to true to color the input field red
	sx?: Partial<{ // style for the input field and the show/hide button mui-v5 only
		formControl: SxProps<Theme>;
		input: SxProps<Theme>;
		filledInput: SxProps<Theme>;
		outlinedInput: SxProps<Theme>;
		inputLabel: SxProps<Theme>;
		inputAdornment: SxProps<Theme>;
		iconButton: SxProps<Theme>;
		iconOff: SxProps<Theme>;
		iconOn: SxProps<Theme>;
		helperText: SxProps<Theme>;
	}>;
	inputProps?: InputBaseComponentProps; // props for the input field
	variant?: "standard" | "outlined" | "filled"; // variant of the input field
	label?: string; // label for the input field
	helperText?: string; // helper text for the input field
	margin?: "none" | "dense" | "normal"; // margin of the input field
	hiddenLabel?: boolean; // set to true to hide the label
	required?: boolean; // set to true to mark the input field as required
	disabled?: boolean; // set to true to disable the input field
	placeholder?: string; // placeholder for the input field
}
```
The `onChange` function is called when the value of the input field changes. The `onChange` function returns the new value of the input field.\
The `value` prop is used to set the value of the input field. If the `value` prop is not set, the input field is empty.\
The `classNames` prop can be used to control the CSS classes of the input field and the show/hide button.\
You can use the `classNames` with the `style.css` or with the `makeStyles` function of Material UI.\
The `classNames` prop has the following properties:
- `input`: CSS class for the Input component (e.g. with `useStyles` => `input={{ classes.input }}` or with `style.css` => `input={{ className: "my-input" }}`)
- `formControl`: CSS class for the FormControl component
- `filledInput`: CSS class for the FilledInput component
- `outlinedInput`: CSS class for the OutlinedInput component
- `inputLabel`: CSS class for the InputLabel component
- `inputAdornment`: CSS class for the InputAdornment component
- `iconButton`: CSS class for the IconButton component
- `iconOff`: CSS class for the icon when the password is shown
- `iconOn`: CSS class for the icon when the password is hidden
- `helperText`: CSS class for the helper text

The `sx` prop can be used to control the style of the input field and the show/hide button only for mui-v5. The sx prop has the following properties:
  - same as `classNames`


## Example

```tsx
import React from "react";
import { PasswordInput, PasswordColors } from "iobroker-react/components";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	formControl: {
		width: "200px !important",
	},
}));

interface PasswordInputExampleProps {
	native: ioBroker.AdapterConfig;
	onChange: (attr: string, value: string) => void;
}

export const PasswordInputExample: React.FC<PasswordInputExampleProps>
= (props): JSX.Element => {
	const classes = useStyles();
	const [error, setError] = React.useState<{
		message: string;
		error: boolean;
		color: PasswordColors["color"];
	}>({
		message: "enter your password",
		error: false,
		color: "primary",
	});

	// example check password length
	const validatePassword = (value: string) => {
		if (value.length < 8) {
			if (value.length === 0) {
				setError({
					message: "Password is required",
					error: true,
					color: "error",
				});
				props.onChange('password', value) // your update password function here 
				return;
			}
			setError({
				...error,
				message: "Password must be at least 8 characters long",
				error: true,
				color: "error",
			});
		} else {
            setError({
				...error,
				message: "Password is valid",
				error: false,
				color: "success",
			});
			props.onChange('password', value) // your update password function here 
    }
	};
	return (
		<PasswordInput 
			label={"Password"} 
			variant={"standard"} 
			required={true} 
			placeholder={"Enter your password"} 
			classNames={{ formControl: classes.formControl }} // mui-v4 or mui-v5
			// sx={{
			// 	formControl: {
			// 		width: "200px",  // mui-v5 only
			// 	},
			// }}
			value={props.native.password} // your password value here from your database
			onChange={validatePassword}  // your password change function here
			colors={{ color: error.color }} 
			error={error.error} 
			helperText={error.message}


		/>
	);
}
```



