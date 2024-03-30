import { persistentAtom } from "@nanostores/persistent";

export const $selectedDate = persistentAtom<string>(
	"selectedDate",
	new Date().toDateString(),
	{
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
	},
);

export function updateSelectedDate(date: string) {
	$selectedDate.set(date);
}
