import { atom } from "nanostores";

export const $selectedDay = atom<string>(new Date().toDateString());

export function updateSelectedDay(date: string) {
	$selectedDay.set(date);
}
