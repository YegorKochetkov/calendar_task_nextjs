import { map } from "nanostores";

import { Holiday } from "@/lib/fetchHolidays";

export const $holidays = map<Holiday[]>([]);

export function setHolidays(holidays: Holiday[]) {
	$holidays.set(holidays);
}
