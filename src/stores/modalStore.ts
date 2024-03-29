import { atom } from "nanostores";

export const $modalState = atom<boolean>(false);

export function showModal(state: boolean) {
	$modalState.set(state);
}
