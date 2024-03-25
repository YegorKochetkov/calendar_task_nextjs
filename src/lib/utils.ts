export const calendarRows = 6;
export const calendarColumns = 7;
export const weekStartDayIndex = 1; // use 0 for week starts on Sunday

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
