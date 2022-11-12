# Components 

Most predefined components can be imported directly from the `@iobroker/adapter-react-v5` package. However there are a few that are not compatible with the functional approach we 
use here. These are described here.

## `SettingsApp`

The `SettingsApp` is a predefined app component specifically meant for the adapter configuration UI and includes buttons to save and close the configuration.  
→ [Documentation](components/SettingsApp.md)

## `IoBrokerApp`

The `IoBrokerApp` must be the outermost component in your ioBroker UI (unless you're using a `SettingsApp`). It provides the connection to the ioBroker backend and sets up the context used by all hooks.  
→ [Documentation](components/IoBrokerApp.md)

## `Dropdown`

A thin wrapper around Material UI's `Select` component, specifically for dropdowns.  
→ [Documentation](components/Dropdown.md)

## `Loader`

This component displays the loading ioBroker icon. The original version from `@iobroker/adapter-react-v5` has some problems, so this one is used as a replacement.  
→ [Documentation](components/Loader.md)

## `Logo`

This component displays the ioBroker logo with config download and upload buttons.\
→ [Documentation](components/Logo.md)

## `SaveCloseButtons`

This component displays the Save and Close buttons of the `SettingsApp`. It is a simplified and cleaned up version of the component from `@iobroker/adapter-react-v5`.
You shouldn't need to use it directly.  
→ [Documentation](components/SaveCloseButtons.md)

## `TreeTable`

This component displays a table with a tree structure. It is a simplified and cleaned up version of the component from `@iobroker/adapter-react-v5`.\
→ [Documentation](components/TreeTable.md)

## `PasswordInput`

This component displays a password input field. das Passwort kann angezeigt werden und auch wieder ausgeblendet werden.\
→ [Documentation](components/PasswordInput.md)

## `NumberInput`

A thin wrapper around Material UI's `TextField` component, specifically for numbers.\
→ [Documentation](components/NumberInput.md)

## `IpAddressInput`

A thin wrapper around Material UI's `TextField` component, specifically for IP addresses with validation.\
→ [Documentation](components/IpAddressInput.md)
