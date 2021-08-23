/* eslint-disable @typescript-eslint/no-empty-function */

import * as React from "react";
import type { ShowModal } from "../components/ModalDialog";
import type { ShowNotification } from "../components/Notification";

export type IDialogsContext = {
	showModal: ShowModal;
	hideModal: () => void;
	showNotification: ShowNotification;
};

// Context that stores references to the methods that show Notifications and Modals
export const DialogsContext = React.createContext<IDialogsContext>({
	showModal: () => Promise.resolve(false),
	hideModal: () => {},
	showNotification: () => {},
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDialogs = () => React.useContext(DialogsContext);
