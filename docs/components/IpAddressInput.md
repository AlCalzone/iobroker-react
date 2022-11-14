# `IpAddressInput`

`IpAddressInput` is a component that allows the user to enter an IP address.\
**This input field is only suitable for IP addresses in `ipv4` format, it does not support `ipv6` addresses.** \
The input is checked via a `regex` and only valid IP addresses are accepted.\
It also automatically inserts a dot after every 3rd number. (e.g. `192.168.179.1`)


```ts
import { IpAddressInput } from "iobroker-react/components";
```

```tsx
interface IpAddressInputProps {
	label?: string; // Label for the input field
	value: string; // Value of the input field
	defaultValue?: string; // Default value of the input field
	onChange: (value: string, valid?: boolean) => void; // Callback when the value changes (valid is true if the value is a valid IP address)
	required?: boolean; // Is the input field required?
	variant?: "standard" | "filled" | "outlined"; // Variant of the input field (default: "outlined")
	classNames?: Partial<{
		// Class names for the input field
		input: string; // Class name for the input field
		inputProps: string; // Class name for the input field props
		helperText: string; // Class name for the helper text
	}>;
	sx?: Partial<{
		// Style for the input field
		input: SxProps<Theme>; // Style for the input field
		inputProps: SxProps<Theme>; // Style for the input field props
		helperText: SxProps<Theme>; // Style for the helper text
	}>;
	maxLength?: number; // Maximum length of the input field (default: 15 for IPv4)
	textAlign?: "left" | "center" | "right"; // Text alignment of the input field (default: "left")
	margin?: "none" | "dense" | "normal"; // Margin of the input field (default: "none")
	color?: "error" | "primary" | "secondary" | "info" | "success" | "warning"; // Color
	disabled?: boolean; // Is the input field disabled?
	error?: boolean; // aktivate validation function (default: false)
	helperText?: Partial<{
		default: string; // Helper text for the input field
		invalid: string; // Helper text for the input field when the value is invalid
		valid: string; // Helper text for the input field when the value is valid
	}>;
	placeholder?: string; // Placeholder for the input field
	tooltip?: Partial<TooltipProps>; // Tooltip props title, placement, arrow, etc. title is required
}
```

**All properties of `IpAddressInput` that can be seen above in the `IpAddressInputProps` interface are optional except `onChange` and `value` which must always be specified.**

The `onChange` function is called when the value of the input field changes. The `onChange` function returns the new value and a boolean value indicating which indicates\
whether the value is a valid IP address if the function has been defined via the `error` property and enabled with `true`; otherwise the `onChange` function returns only the
new value.\
The `valid` parameter in `onChange` can then be used for further validation.

The `value` prop is used to set the value of the input field from native (e.g. `value={native.ipAddress}`).

The `classNames` prop can be used to control the CSS classes of the input field and the show/hide button.\
You can use the `classNames` with the `style.css` or with the `makeStyles` function of Material UI.\
The `classNames` prop has the following properties:
- `input` - CSS class for the input field (e.g. with `useStyles` => `classNames={{ input: classes.input}} ` or with `style.css` => `classNames={{ input: "my-input" }}`)
- `inputProps` - CSS class for the input field props  
- `helperText` - CSS class for the helper text.

The `sx` prop can be used to control the style of the input field and the show/hide button only for mui-v5. The sx prop has the following properties:
  - same as `classNames`

The `maxLength` prop can be used to set the maximum length of the input field. The default value is `15` for IPv4.\
The `textAlign` prop can be used to control the text alignment of the input field.\

Via the property `error` the function that colors the input field `red` and if you have defined `color` (e.g. `color="success"`) the color\
is set to `success = green` if you have also defined `helperText` (e.g. `helperText={ default: "Enter a valid IP address", valid: "IP address is valid",
invalid: "IP address is invalid" }`)\
the `helperText` is set to `valid` if the input is valid and  to `invalid` if the input is invalid then displayed below the input field.\
With the `tooltip` prop you can set the tooltip of the input field. The tooltip is shown when the user hovers over the input field.


## Example

```tsx
import React from "react";
import { IpAddressInput } from "iobroker-react/components";
import { makeStyles } from "@mui/styles";
import { useI18n } from 'iobroker-react/hooks';

const useStyles = makeStyles((theme) => ({
	input: {
		width: "150px !important",
	},
}));

interface IpAddressInputExampleProps {
	native: ioBroker.AdapterConfig;
	onChange: (attr: string, value: string) => void;
}

export const IpAddressInputExample: React.FC<IpAddressInputExampleProps>
= (props): JSX.Element => {
	const { translate: _ } = useI18n(); // translate function
	const classes = useStyles(); // CSS classes
	const [value, setValue] = React.useState<string>(props.native.ipAddress || '');
  
  const handleChange = (value: string, valid?: boolean) => {
    // if you work with validation you can do the validation here and then call the onChange function
    if (valid) {
        setValue(value);
	    props.onChange("ipAddress", value);
	}
    
    // without validation
	  setValue(value);
	  props.onChange("ipAddress", value);
    
    
  };
  
	return (
            <div>
				<IpAddressInput
					required={true} // optional (default: false)
					variant={"outlined"} // optional (default: "outlined")
					label={_("ipAddress")} // optional if not set no label will be displayed
					value={value} // required
					onChange={handleChange} // required
					color={'success'} // optional (default: "primary")
					error={true} // optional (default: false)
					helperText={{ // optional if not set no helperText will be displayed
						default: _("Enter a valid IP address"),
						valid: _("IP address is valid"),
						invalid: _("IP address is invalid"),
					}}
					// sx={{ width: "150px" }} // optional and only for mui-v5
					classNames={{ input: classes.input}} // mui-v4 and mui-v5  optional
					maxLength={15} // optional (default: 15 for IPv4)
					placeholder={"192.168.179.10"} // optional
					tooltip={{
						title: _("ipAddress_Tooltip"), // required if not set no tooltip will be displayed
						arrow: true, // optional shows an arrow at the tooltip (default: true)
						placement: "top", // optional position of the tooltip (default: "bottom")
					}}
				/>
            </div>
		);
}
```



