import { atom } from "nanostores";

export const $selectedDate = atom<string>(new Date().toDateString());

export function updateSelectedDate(date: string) {
	$selectedDate.set(date);
}
