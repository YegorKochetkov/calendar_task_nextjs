import { addCalendarEvent } from "@/stores/eventsStore";
import { labelsColors } from "./constants";

export const calendarRows = 6;
export const calendarColumns = 7;
export const weekStartDayIndex = 0;

export const getMonthGrid = (date: string) => {
	const year = new Date(date).getFullYear();
	const monthIndex = new Date(date).getMonth();
	const firstWeekDayOfMonth = getFirstWeekDayOfMonth(year, monthIndex);
	let currentDayInGrid = weekStartDayIndex - firstWeekDayOfMonth;

	const monthGrid = new Array(calendarRows).fill([]).map(() => {
		return new Array(calendarColumns).fill(null).map(() => {
			currentDayInGrid++;
			return new Date(year, monthIndex, currentDayInGrid);
		});
	});

	return monthGrid;
};

export const getFirstWeekDayOfMonth = (year: number, monthIndex: number) => {
	const date = new Date(year, monthIndex, 1);

	return date.getDay();
};

export const isLastDayOfMonth = (date: Date) => {
	return (
		date.getDate() ===
		new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
	);
};

export const isFirstDayOfMonth = (date: Date) => {
	return date.getDate() === 1;
};

export const getWeekDaysName = (
	locale: string,
	formatOptions?: Intl.DateTimeFormatOptions["weekday"],
) => {
	const dayFormat = new Intl.DateTimeFormat(locale, {
		weekday: formatOptions,
	});

	const days = Array.from({ length: 7 }, (_, index) =>
		dayFormat.format(new Date(0, 0, index)),
	);

	return days;
};

export function createExampleEvents() {
	Array.from({ length: 4 }).forEach((_, index) => {
		addCalendarEvent({
			id: index.toString(),
			title: `Event ${index}`,
			labelColor: labelsColors[index],
			date: new Date().toISOString(),
		});
	});
}
