import { setHolidays } from "@/stores/holidaysStore";

export type Holiday = {
	date: string;
	name: string;
};

const worldWideHolidaysUrl =
	"https://date.nager.at/api/v3/NextPublicHolidaysWorldwide";
let controller: AbortController;

export const fetchHoliday = async () => {
	try {
		if (controller) {
			controller.abort();
		}

		controller = new AbortController();

		const res = await fetch(worldWideHolidaysUrl, {
			signal: controller.signal,
		});

		const data = (await res.json()) as Holiday[];
		setHolidays(data);
	} catch (error) {
		console.debug("Can`t load holidays", error);

		return [] as Holiday[];
	}
};
