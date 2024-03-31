import { atom } from "nanostores";

export const $selectedDay = atom<string>(
	new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
);

export function updateSelectedDay(date: string) {
	$selectedDay.set(date);
}
