import { persistentAtom } from "@nanostores/persistent";

export const $selectedDate = persistentAtom<string>("selectedDate", "", {
	encode(value) {
		return JSON.stringify(value);
	},
	decode(value) {
		try {
			return JSON.parse(value);
		} catch {
			return new Date().toDateString();
		}
	},
});

export function updateSelectedDate(date: string) {
	$selectedDate.set(date);
}
