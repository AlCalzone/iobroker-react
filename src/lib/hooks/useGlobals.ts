import React from "react";

interface IGlobalsContext {
	adapter: string;
	instance: number;
	namespace: `${string}.${number}`;
}

export const GlobalsContext = React.createContext<IGlobalsContext>({} as any);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGlobals = () => React.useContext(GlobalsContext);
