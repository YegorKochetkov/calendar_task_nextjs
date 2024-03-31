import { localStorageKey } from "@/lib/constants";
import { persistentAtom } from "@nanostores/persistent";

export const $selectedDate = persistentAtom<string>(
	localStorageKey.selectedDate,
	new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
	{
		encode(value) {
			return JSON.stringify(value);
		},
		decode(value) {
			try {
				return JSON.parse(value);
			} catch {
				return new Date().toISOString();
			}
		},
	},
);

export function updateSelectedDate(date: string) {
	$selectedDate.set(date);
}
