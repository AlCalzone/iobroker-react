import React from "react";

/**
 * Hook to react to events of the window object. Example:
 * ```tsx
 * import { useWindowEvent } from "iobroker-react/hooks";
 *
 * const MyComponent: React.FC<MyAppProps> = (props) => {
 *   const connection = useConnection();
 *   const [name, setName] = React.useState("World");
 *
 *   useWindowEvent("message", (msg) => {
 *     if (msg?.data != undefined) setName(msg.data);
 *   });
 *
 *   // Displays "Hello World!" at first.
 *   // When the current page receives a message with content { data: "you" },
 *   // switches to "Hello you!"
 *   return <div>Hello {name}!</div>
 * };
 * ```
 */
export function useWindowEvent<K extends keyof WindowEventMap>(
	type: K,
	listener: (this: Window, ev: WindowEventMap[K]) => any,
	options?: boolean | AddEventListenerOptions,
): void {
	React.useEffect(() => {
		window.addEventListener(type, listener, options);
		return () => window.removeEventListener(type, listener, options);
	}, [listener, options, type]);
}
