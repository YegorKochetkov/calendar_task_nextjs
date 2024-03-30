import { map } from "nanostores";

export type ModalsState = {
	addEventModal: "show" | "close";
	addTaskModal: "show" | "close";
};

export const $modalsState = map<ModalsState>({
	addEventModal: "close",
	addTaskModal: "close",
});

export function showModal(modal: keyof ModalsState) {
	$modalsState.setKey(modal, "show");
}

export function closeModal(modal: keyof ModalsState) {
	$modalsState.setKey(modal, "close");
}

export function closeModals() {
	for (let modal of Object.keys($modalsState.get())) {
		closeModal(modal as keyof ModalsState);
	}
}
