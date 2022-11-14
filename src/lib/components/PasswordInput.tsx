import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import type { InputBaseComponentProps } from "@mui/material/InputBase/InputBase";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import type { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip/Tooltip";
import type { SxProps } from "@mui/system";
import React from "react";

export type PasswordColors = {
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

export interface PasswordInputProps {
	value: string;
	onChange: (value: string) => void;
	classNames?: Partial<{
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
	colors?: Partial<PasswordColors>;
	error?: boolean;
	sx?: Partial<{
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
	inputProps?: InputBaseComponentProps;
	variant?: "standard" | "outlined" | "filled";
	label?: string;
	helperText?: string;
	margin?: "none" | "dense" | "normal";
	hiddenLabel?: boolean;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	tooltip?: Partial<TooltipProps>;
}

// funktion create random id for input
function randomId() {
	return Math.random().toString(36).substr(2, 9);
}

export const PasswordInput: React.FC<PasswordInputProps> = (
	props,
): JSX.Element => {
	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const handleClickShowPassword = (): void => {
		setShowPassword(!showPassword);
	};

	const handleChangePassword = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		props.onChange(event.target.value);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const inputTyps = (variant: string | undefined): JSX.Element => {
		if (variant === "standard") {
			return (
				<Input
					id={`passwordField-${randomId()}`}
					type={showPassword ? "text" : "password"}
					value={props.value || ""}
					onChange={handleChangePassword}
					error={props.error}
					className={props.classNames?.outlinedInput}
					sx={props.sx?.outlinedInput}
					inputProps={props.inputProps}
					aria-label={props.label ? props.label : "Password"}
					placeholder={props.placeholder}
					endAdornment={
						<InputAdornment
							className={props.classNames?.inputAdornment}
							sx={props.sx?.inputAdornment}
							position="end"
						>
							<IconButton
								aria-label="toggle password visibility"
								className={props.classNames?.iconButton}
								sx={props.sx?.iconButton}
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? (
									<VisibilityOff
										className={props.classNames?.iconOff}
										sx={props.sx?.iconOff}
										titleAccess="Hide password"
										color={props.colors?.iconOff}
									/>
								) : (
									<Visibility
										className={props.classNames?.iconOn}
										sx={props.sx?.iconOn}
										titleAccess="Show Password"
										color={props.colors?.iconOn}
									/>
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
			);
		}
		if (variant === "filled") {
			return (
				<FilledInput
					id={`passwordField-${randomId()}`}
					type={showPassword ? "text" : "password"}
					value={props.value || ""}
					onChange={handleChangePassword}
					error={props.error}
					className={props.classNames?.outlinedInput}
					sx={props.sx?.outlinedInput}
					inputProps={props.inputProps}
					aria-label={props.label ? props.label : "Password"}
					placeholder={props.placeholder}
					endAdornment={
						<InputAdornment
							className={props.classNames?.inputAdornment}
							sx={props.sx?.inputAdornment}
							position="end"
						>
							<IconButton
								aria-label="toggle password visibility"
								className={props.classNames?.iconButton}
								sx={props.sx?.iconButton}
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? (
									<VisibilityOff
										className={props.classNames?.iconOff}
										sx={props.sx?.iconOff}
										titleAccess="Hide password"
										color={props.colors?.iconOff}
									/>
								) : (
									<Visibility
										className={props.classNames?.iconOn}
										sx={props.sx?.iconOn}
										color={props.colors?.iconOn}
										titleAccess="Show Password"
									/>
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
			);
		}

		return (
			<OutlinedInput
				id={`passwordField-${randomId()}`}
				type={showPassword ? "text" : "password"}
				value={props.value || ""}
				onChange={handleChangePassword}
				error={props.error}
				className={props.classNames?.outlinedInput}
				sx={props.sx?.outlinedInput}
				inputProps={props.inputProps}
				label={props.label ? props.label : "Password"}
				aria-label={props.label ? props.label : "Password"}
				placeholder={props.placeholder}
				endAdornment={
					<InputAdornment
						className={props.classNames?.inputAdornment}
						sx={props.sx?.inputAdornment}
						position="end"
					>
						<IconButton
							aria-label="toggle password visibility"
							className={props.classNames?.iconButton}
							sx={props.sx?.iconButton}
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? (
								<VisibilityOff
									className={props.classNames?.iconOff}
									sx={props.sx?.iconOff}
									titleAccess="Hide password"
									color={props.colors?.iconOff}
								/>
							) : (
								<Visibility
									className={props.classNames?.iconOn}
									sx={props.sx?.iconOn}
									color={props.colors?.iconOn}
									titleAccess="Show Password"
								/>
							)}
						</IconButton>
					</InputAdornment>
				}
			/>
		);
	};

	return (
		<React.Fragment>
			<FormControl
				className={props.classNames?.formControl}
				fullWidth
				variant={props.variant}
				sx={props.sx?.formControl}
				error={props.error}
				color={props.colors?.color}
				margin={props.margin}
				required={props.required}
				disabled={props.disabled}
				hiddenLabel={props.hiddenLabel}
			>
				{!props.hiddenLabel ? (
					<InputLabel
						className={props.classNames?.inputLabel}
						sx={props.sx?.inputLabel}
						color={props.colors?.color}
						htmlFor={`passwordField-${randomId()}`}
						aria-label={props.label ? props.label : "Password"}
					>
						{props.label ? props.label : "Password"}
					</InputLabel>
				) : null}
				<Tooltip title={props.tooltip?.title} {...props.tooltip}>
					{inputTyps(props.variant)}
				</Tooltip>
				{props.helperText && (
					<FormHelperText
						className={props.classNames?.helperText}
						sx={props.sx?.helperText}
						disabled={props.disabled}
					>
						{props.helperText}
					</FormHelperText>
				)}
			</FormControl>
		</React.Fragment>
	);
};
