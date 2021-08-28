import React from "react";

export const ExpertModeContext = React.createContext<boolean>(false);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useExpertMode = () => React.useContext(ExpertModeContext);
