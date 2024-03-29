import { atom } from "nanostores";

export const $modalState = atom<boolean>(false);

export function showModal() {
	$modalState.set(true);
}

export function closeModal() {
	$modalState.set(false);
}
