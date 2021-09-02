# Hooks

Hooks allow you to reuse logic between components of your application. We've created some predefined hooks to make your life with ioBroker easier:

## `useAdapter` hook

The `useAdapter` hook is used to subscribe to the adapter's `alive` and `connected` states.  
→ [Documentation](components/useAdapter.md)

## `useConnection` hook

The `useConnection` hook provides access to the socket connection to the ioBroker backend.  
→ [Documentation](components/useConnection.md)

## `useDialogs` hook

The `useDialogs` hook can be used to display simple [modal dialogs](https://material-ui.com/components/dialogs/) as well as [snackbar notifications](https://material-ui.com/components/snackbars/).  
→ [Documentation](components/useDialogs.md)

## `useExpertMode` hook

The `useExpertMode` hook returns a `boolean` that can be used to determine whether **expert mode** is currently active.  
→ [Documentation](components/useExpertMode.md)

## `useGlobals` hook

The `useGlobals` hook is used to access some global constants identifying the current adapter.  
→ [Documentation](components/useGlobals.md)

## `useI18n` hook

The `useI18n` hook is used to provide internationalization support to your UI.  
→ [Documentation](components/useI18n.md)

## `useIoBrokerObject` hook

The `useIoBrokerObject` hook allows you to read objects from the ioBroker DB, subscribe to changes and extend the objects.  
→ [Documentation](components/useIoBrokerObject.md)

## `useIoBrokerState` hook

The `useIoBrokerState` hook allows you to read states from the ioBroker DB, subscribe to changes and change the state.  
→ [Documentation](components/useIoBrokerState.md)

## `useIoBrokerTheme` hook

Using the `useIoBrokerTheme` hook, you can determine which ioBroker theme is currently active and change it.  
→ [Documentation](components/useIoBrokerTheme.md)

## `useWindowEvent` hook

The `useWindowEvent` hook is used to subcribe to window events and react to them, like `"message"`, `"resize"`, etc.  
→ [Documentation](components/useWindowEvent.md)
