import { localStorageKey } from "@/lib/constants";
import { persistentAtom } from "@nanostores/persistent";

export const $selectedDate = persistentAtom<string>(
	localStorageKey.selectedDate,
	new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
);

export function updateSelectedDate(date: string) {
	$selectedDate.set(new Date(date).toISOString());
}
