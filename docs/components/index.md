# Components <!-- {docsify-ignore-all} -->

Most predefined components can be imported directly from the `@iobroker/adapter-react` package. However there are a few that are not compatible with the functional approach we use here. These are described here.

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

This component displays the loading ioBroker icon. The original version from `@iobroker/adapter-react` has some problems, so this one is used as a replacement.  
→ [Documentation](components/Loader.md)

## `SaveCloseButtons`

This component displays the Save and Close buttons of the `SettingsApp`. It is a simplified and cleaned up version of the component from `@iobroker/adapter-react`.
You shouldn't need to use it directly.  
→ [Documentation](components/SaveCloseButtons.md)
